import React, { Suspense, useEffect } from "lib_ui/react";
import ReactDOM from "lib_ui/react-dom";
import { Switch, Route, BrowserRouter } from "lib_ui/react-router-dom";
import { Provider } from "lib_ui/react-redux";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "shared_lib_ui/MUItheme";
import { store } from "shared_lib_ui/store";
import { DrawerProvider } from "shared_lib_ui/Lib/layout/drawers";
import { NotFound } from "shared_lib_ui/Lib/components";

import HostMenu from "./leftMenu/HostMenu";
import RemotePsApp from "ps_ui/RemotePsApp";
import RemoteBenefApp from "benef_ui/RemoteBenefApp";
import RemoteHospiApp from "hospi_ui/RemoteHospiApp";
import RemotePayementApp from "payment_ui/RemotePayementApp";
import RemoteIntraitablesApp from "intraitables_ui/RemoteIntraitablesApp";
import RemoteTPSApp from "tps_ui/RemoteTPSApp";
import RemoteInduApp from "indu_ui/RemoteInduApp";

const PageDashboard = () => (
    <Typography variant="h3" noWrap component="div" sx={{ padding: "15px 25px", color: "#003154" }}>
        Dashboard Page
    </Typography>
);

const PSremote = () => <RemotePsApp store={store} />;
const BenefRemote = (props) => <RemoteBenefApp store={store} {...props} />;
const PayementRemote = () => <RemotePayementApp store={store} />;
const HospiRemote = () => <RemoteHospiApp store={store} />;
const TPSRemote = () => <RemoteTPSApp store={store} />;
const InduRemote = () => <RemoteInduApp store={store} />;
const IntraitablesRemote = () => <RemoteIntraitablesApp store={store} />;

// const ConfigurationBase = () => <Configurations store={store} />;
// const ListConfigurationBase = () => <ListConfiguration store={store} />;
// const ConfigurationDetailsByIdBase = () => <ConfigurationDetailsById store={store} />;

const App = () => {
    useEffect(() => {
        // store.injectReducer("configurations", configurationsReducer);
    }, []);

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <DrawerProvider>
                    <BrowserRouter>
                        <Suspense fallback="Loading...">
                            <Box sx={{ display: "flex" }}>
                                <CssBaseline />
                                <HostMenu />
                                <Box component="main" sx={{ flexGrow: 1 }}>
                                    <Switch>
                                        <Route exact path="/" component={PageDashboard} />
                                        
                                        <Route path={["/psdashboard", "/ps"]}>
                                            <PSremote />
                                        </Route>

                                        <Route path="/beneficiaire">
                                            <BenefRemote />
                                        </Route>

                                        <Route path={["/paiementdashboard","/paiement", "/virements"]}>
                                            <PayementRemote />
                                        </Route>

                                        <Route path={["/hospidashboard", "/serviceEnLigne", "/factures", "/intraitables", "/parametres"]}>
                                            <HospiRemote />
                                        </Route>

                                        <Route path={["/tpsdashboard","/tpsFactures/create", "/tpsFactures","/TpAmcFluxInfo","/tpAmcServiceEnLigne"]}>
                                            <TPSRemote />
                                        </Route>

                                        <Route path={["/indusdashboard", "/indus", "/remboursements"]}>
                                            <InduRemote />
                                        </Route>

                                        <Route path={["/intraitablesdashboard","/facturesintraitables","/intraitables"]}>
                                            <IntraitablesRemote />
                                        </Route>
                                        
                                        <Route path={["/not-found" ,"*"]} component={NotFound} />
                                        
                                    </Switch>
                                </Box>
                            </Box>
                        </Suspense>
                    </BrowserRouter>
                </DrawerProvider>
            </ThemeProvider>
        </Provider>
    );
};

ReactDOM.render(
    <StyledEngineProvider injectFirst>
        <App />
    </StyledEngineProvider>,
    document.getElementById("root")
);
