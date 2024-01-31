import React, { useEffect } from "lib_ui/react";
import ReactDOM from "lib_ui/react-dom";

import { Provider } from "lib_ui/react-redux";
import { store } from "shared_lib_ui/store";
import theme from "shared_lib_ui/MUItheme";

import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";

import { CookiesProvider } from "react-cookie";

// Msal imports
import { MsalProvider, MsalAuthenticationTemplate } from "lib_ui/@azure-msal-react";
import { InteractionType, EventType } from "lib_ui/@azure-msal-browser";
import { msalInstance } from "shared_lib_ui/auth";

import { setAccount } from "shared_lib_ui/host";

import Routs from "./components/Routs";
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

ReactDOM.render(
    <StyledEngineProvider injectFirst>
        <App />
    </StyledEngineProvider>,
    document.getElementById("root"),
);
