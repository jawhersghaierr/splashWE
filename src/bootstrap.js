import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "shared_lib_ui/store";
import { Favicon } from "shared_lib_ui/assets";
import { isOxantis } from "shared_lib_ui/Lib";
import theme from "shared_lib_ui/MUItheme";

import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";

import { CookiesProvider } from "react-cookie";

// Msal imports
import { MsalProvider, MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType, EventType } from "@azure/msal-browser";
import { msalInstance } from "shared_lib_ui/auth";

import { setAccount } from "shared_lib_ui/host";

import ExtendedProviderWrapper from "./components/ExtendedProviderWrapper";

const App = () => {
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

        window.document.title = isOxantis ? "Oxantis" : "Viamedis";
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
    <StyledEngineProvider injectFirst>
        <App />
    </StyledEngineProvider>,
);
