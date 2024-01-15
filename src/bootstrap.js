import React, { Suspense, useState, useEffect } from "lib_ui/react";
import ReactDOM from "lib_ui/react-dom";
import { Link, Switch, Route, BrowserRouter } from "lib_ui/react-router-dom";
import { Provider, useSelector } from "lib_ui/react-redux";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "shared_lib_ui/MUItheme";
import { store } from "shared_lib_ui/store";
import { DrawerProvider } from "shared_lib_ui/Lib/layout/drawers";
import { NotFound } from "shared_lib_ui/Lib/components";
import { TermsService, AccepterCookie } from "shared_lib_ui/Lib/layout";

import HostMenu from "./leftMenu/HostMenu";
import RemotePsApp from "ps_ui/RemotePsApp";
import RemoteBenefApp from "benef_ui/RemoteBenefApp";
import RemoteHospiApp from "hospi_ui/RemoteHospiApp";
import RemotePayementApp from "payment_ui/RemotePayementApp";
import RemoteIntraitablesApp from "intraitables_ui/RemoteIntraitablesApp";
import RemoteTPSApp from "tps_ui/RemoteTPSApp";
import RemoteInduApp from "indu_ui/RemoteInduApp";
import { useCookies, CookiesProvider } from "react-cookie";

// Msal imports
import { MsalProvider, MsalAuthenticationTemplate } from "lib_ui/@azure-msal-react";
import { InteractionType, EventType } from "lib_ui/@azure-msal-browser";
import { msalInstance } from "shared_lib_ui/auth";

import { setAccount } from "shared_lib_ui/host";
import RemoteAuthApp from "auth_ui/RemoteAuthApp";
import Home from "./components/Home";
import { getClaims } from "shared_lib_ui/host";
import { isAuthenticated } from "shared_lib_ui/host";
import { GetMultiModuleClaims } from "auth_ui/RemoteAuthApp";

// IdleTimer
import { timeout, promptBeforeIdle } from "shared_lib_ui/Lib";
import { IdleTimerProvider, PresenceType, useIdleTimerContext } from "lib_ui/react-idle-timer";
import { RefreshTokenPrompt } from "shared_lib_ui/auth";
import Footer from "./components/Footer";
import Routs from "./components/Routs";
import { MODULES } from "./utils/consts";

const App = () => {
    const [promptOpen, setPromptOpen] = useState(false);

    const [cookies] = useCookies([]);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    useEffect(() => {
        if (Object.keys(cookies)?.length == 0) {
            setOpenConfirmDialog(true);
        }
    }, [cookies]);

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

    const onPromptIsIdle = () => {
        setPromptOpen(true);
    };

    const onIdle = () => {
        setPromptOpen(false);
    };

    const onActiveIsIdle = () => {
        setPromptOpen(false);
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <IdleTimerProvider
                    timeout={timeout}
                    promptBeforeIdle={promptBeforeIdle}
                    throttle={500}
                    onPrompt={onPromptIsIdle}
                    onIdle={onIdle}
                    onActive={onActiveIsIdle}>
                    <CookiesProvider>
                        <DrawerProvider>
                            <BrowserRouter>
                                <Suspense fallback="Loading...">
                                    <MsalProvider instance={msalInstance}>
                                        <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
                                            <Box sx={{ display: "flex" }}>
                                                <CssBaseline />
                                                <HostMenu />
                                                <AccepterCookie opened={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} />
                                                <RefreshTokenPrompt open={promptOpen} />
                                                <Routs />
                                            </Box>
                                        </MsalAuthenticationTemplate>
                                    </MsalProvider>
                                </Suspense>
                            </BrowserRouter>
                        </DrawerProvider>
                    </CookiesProvider>
                </IdleTimerProvider>
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
