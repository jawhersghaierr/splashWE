import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "shared_lib_ui/store";
import { Favicon } from "shared_lib_ui/assets";
import { isOxantis } from "shared_lib_ui/Lib";
import theme from "shared_lib_ui/MUItheme";

import StyledEngineProvider from "@mui/styled-engine/StyledEngineProvider/StyledEngineProvider";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { CookiesProvider } from "react-cookie";

// Msal imports
import { MsalProvider, MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType, EventType } from "@azure/msal-browser";
import { msalInstance } from "shared_lib_ui/auth";
import { setAccount } from "shared_lib_ui/host";
import ExtendedProviderWrapper from "./components/ExtendedProviderWrapper";
import { SplashScreenProvider, useSplashScreen } from "./providers/SplashScreenContext";
import SplashScreen from "./spalshScreen/SplashScreen";
import { useSelector } from "react-redux";
import { getUser } from "shared_lib_ui/auth";



const App = () => {
    const { userInfo, dismissSplashScreen, startSplashScreenInterval, handleShowSplash, setHandleShowSplash, updateConsultedStatusPerUser, splashUserConetnt } = useSplashScreen();
    useEffect(() => {
        console.log("emailData", userInfo);
        const userEmail = userInfo?.account?.username; // Replace with actual user email or retrieve dynamically
        const intervalTime = 5000; // 5 minutes in milliseconds

        // Start interval for fetching splash screen data
        if (userEmail)
            startSplashScreenInterval(userEmail, intervalTime);

        // Optionally, clean up the interval on app exit or cleanup
        return () => {
            clearInterval(intervalTime);
        };
    }, [userInfo]);

    useEffect(() => {
        const callbackId = msalInstance.addEventCallback(event => {
            switch (event.eventType) {
                case EventType.ACQUIRE_TOKEN_SUCCESS:
                    store.dispatch(setAccount(event.payload));
                    break;

                case EventType.LOGIN_SUCCESS:
                    if (event.payload) {
                        const account = event.payload;
                        msalInstance.setActiveAccount(account);
                        store.dispatch(setAccount(account));
                    }
                    break;
            }
        });

        window.document.title = isOxantis ? "TP ROC Mutuelles" : "Viamedis";
        Favicon();

        return () => {
            if (callbackId) msalInstance.removeEventCallback(callbackId);
        };
    }, []);

    return (
        <Provider store={store}>

            <ThemeProvider theme={theme}>
                <CookiesProvider>
                    <MsalProvider instance={msalInstance}>
                        <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
                            {handleShowSplash && (
                                <SplashScreen opened={handleShowSplash} onClose={() => console.log("test")} />
                            )}
                            <ExtendedProviderWrapper />
                        </MsalAuthenticationTemplate>
                    </MsalProvider>
                </CookiesProvider>
            </ThemeProvider>
        </Provider>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>

        <StyledEngineProvider injectFirst>
            <SplashScreenProvider>
                <App />
            </SplashScreenProvider>
        </StyledEngineProvider>
    </Provider>
);
