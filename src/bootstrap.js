import React, { Suspense, useState, useEffect } from "lib_ui/react";
import ReactDOM from "lib_ui/react-dom";
import { Link, Switch, Route, BrowserRouter } from "lib_ui/react-router-dom";
import { Provider } from "lib_ui/react-redux";
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

const PSremote = () => <RemotePsApp store={store} />;
const BenefRemote = props => <RemoteBenefApp store={store} {...props} />;
const PayementRemote = () => <RemotePayementApp store={store} />;
const HospiRemote = () => <RemoteHospiApp store={store} />;
const TPSRemote = () => <RemoteTPSApp store={store} />;
const InduRemote = () => <RemoteInduApp store={store} />;
const IntraitablesRemote = () => <RemoteIntraitablesApp store={store} />;
const AuthRemote = () => <RemoteAuthApp store={store} />;

const App = () => {
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

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
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
                                            <Box
                                                component="main"
                                                sx={{
                                                    flexGrow: 1,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}>
                                                <Switch>
                                                    <Route exact path="/" component={Home} />
                                                    <Route path={["/psdashboard", "/ps", "/ps/profile"]}>
                                                        <PSremote />
                                                    </Route>

                                                    <Route
                                                        path={[
                                                            "/terms",
                                                            "/terms/terms-of-service",
                                                            "/terms/legal-notice",
                                                            "/terms/personal-data-protection-policy",
                                                        ]}>
                                                        <TermsService />
                                                    </Route>

                                                    <Route path={["/benefdashboard", "/beneficiaire"]}>
                                                        <BenefRemote />
                                                    </Route>

                                                    <Route path={["/paiementdashboard", "/paiement", "/virements"]}>
                                                        <PayementRemote />
                                                    </Route>

                                                    <Route path={["/hospidashboard", "/serviceEnLigne", "/factures", "/intraitables", "/parametres"]}>
                                                        <HospiRemote />
                                                    </Route>

                                                    <Route
                                                        path={[
                                                            "/tpsdashboard",
                                                            "/tpsFactures/create",
                                                            "/tpsFactures",
                                                            "/TpAmcFluxInfo",
                                                            "/tpAmcServiceEnLigne",
                                                        ]}>
                                                        <TPSRemote />
                                                    </Route>

                                                    <Route path={["/indusdashboard", "/indus", "/indus/create", "/remboursements"]}>
                                                        <InduRemote />
                                                    </Route>

                                                    <Route path={["/intraitablesdashboard", "/facturesintraitables", "/intraitables"]}>
                                                        <IntraitablesRemote />
                                                    </Route>

                                                    <Route path="/auth">
                                                        {" "}
                                                        <AuthRemote />{" "}
                                                    </Route>

                                                    <Route path={["/not-found", "*"]} component={NotFound} />
                                                </Switch>

                                                <div
                                                    id="footer"
                                                    style={{
                                                        alignSelf: "center",
                                                        textAlign: "center",
                                                        minHeight: "20px",
                                                        padding: "5px",
                                                        maxWidth: "90%",
                                                    }}>
                                                    <Link
                                                        color="inherit"
                                                        to="/terms/terms-of-service"
                                                        style={{
                                                            textDecoration: "none",
                                                        }}>
                                                        <Typography
                                                            variant="h6"
                                                            noWrap
                                                            component="span"
                                                            sx={{
                                                                color: theme => theme.palette.grey.grey5,
                                                            }}>
                                                            Conditions générales
                                                        </Typography>
                                                    </Link>
                                                    &nbsp; - &nbsp;
                                                    <Link
                                                        color="inherit"
                                                        to="/terms/legal-notice"
                                                        style={{
                                                            textDecoration: "none",
                                                        }}>
                                                        <Typography
                                                            variant="h6"
                                                            noWrap
                                                            component="span"
                                                            sx={{
                                                                color: theme => theme.palette.grey.grey5,
                                                            }}>
                                                            Mentions légales
                                                        </Typography>
                                                    </Link>
                                                    &nbsp; - &nbsp;
                                                    <Link
                                                        color="inherit"
                                                        to="/terms"
                                                        style={{
                                                            textDecoration: "none",
                                                        }}>
                                                        <Typography
                                                            variant="h6"
                                                            noWrap
                                                            component="span"
                                                            sx={{
                                                                color: theme => theme.palette.grey.grey5,
                                                            }}>
                                                            Gestion des cookies
                                                        </Typography>
                                                    </Link>
                                                    &nbsp; - &nbsp;
                                                    <Link
                                                        color="inherit"
                                                        to="/terms/personal-data-protection-policy"
                                                        style={{
                                                            textDecoration: "none",
                                                        }}>
                                                        <Typography
                                                            variant="h6"
                                                            noWrap
                                                            component="span"
                                                            sx={{
                                                                color: theme => theme.palette.grey.grey5,
                                                            }}>
                                                            Politique de protection des données
                                                        </Typography>
                                                    </Link>
                                                </div>
                                            </Box>
                                        </Box>
                                    </MsalAuthenticationTemplate>
                                </MsalProvider>
                            </Suspense>
                        </BrowserRouter>
                    </DrawerProvider>
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
