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

import configurationsReducer from "./components/configurations/configurationsSlice";
import HostMenu from "./leftMenu/HostMenu";
import ConfigurationDetailsById from "./components/configurations/ConfigurationDetailsById";
import { ListConfiguration } from "./components/configurations/ListConfiguration";
import { Configurations } from "./components/configurations/Configurations";
import RemotePsApp from "ps_ui/RemotePsApp";
import RemoteBenefApp from "benef_ui/RemoteBenefApp";
import RemoteHospiApp from "hospi_ui/RemoteHospiApp";
import RemotePayementApp from "payment_ui/RemotePayementApp";

// Msal imports
import { MsalProvider, MsalAuthenticationTemplate, UnauthenticatedTemplate  } from "lib_ui/@azure-msal-react";
import { InteractionType, EventType } from "lib_ui/@azure-msal-browser";
import { msalInstance } from "shared_lib_ui/msal";

import {setAccount} from "shared_lib_ui/host";
import {UserAccess} from "./components/UserAccess";




const PageDashboard = () => (<>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Typography variant="h3" noWrap component="div" sx={{ padding: "15px 25px", color: "#003154" }}>
                Dashboard Page
            </Typography>
            <div style={{margin: '35px'}}><UserAccess/></div>
        </div>
    </>
);
const PSremote = () => <RemotePsApp store={store} />;
const BenefRemote = (props) => <RemoteBenefApp store={store} {...props} />;
const PayementRemote = () => <RemotePayementApp store={store} />;
const HospiRemote = () => <RemoteHospiApp store={store} />;

const ConfigurationBase = () => <Configurations store={store} />;
const ListConfigurationBase = () => <ListConfiguration store={store} />;
const ConfigurationDetailsByIdBase = () => <ConfigurationDetailsById store={store} />;

const App = () => {
    useEffect(() => {
        store.injectReducer("configurations", configurationsReducer);
        
        const callbackId = msalInstance.addEventCallback((event) => {
            
            switch (event.eventType) {
                case EventType.ACQUIRE_TOKEN_SUCCESS:
                    store.dispatch(setAccount(event.payload));
                    break
                
                case EventType.LOGIN_SUCCESS:
                    if (event.payload) {
                        const account = event.payload;
                        msalInstance.setActiveAccount(account);
                        store.dispatch(setAccount(account));
                    }
                    break
            }
        });
        
        return () => {
            if (callbackId) msalInstance.removeEventCallback(callbackId);
        }
        
    }, []);

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <DrawerProvider>
                    <BrowserRouter>
                        <Suspense fallback="Loading...">
                            <MsalProvider instance={msalInstance}>
                                <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
                                
                                    <Box sx={{ display: "flex" }}>
                                    
                                    <CssBaseline />
                                    <HostMenu />
                                    <Box component="main" sx={{ flexGrow: 1 }}>
                                        <Switch>

                                                <Route exact path="/" component={PageDashboard} />
        
                                                <Route
                                                    exact
                                                    index
                                                    name={"Configuration"}
                                                    path="/configuration"
                                                    component={ConfigurationBase}
                                                />
                                                <Route
                                                    exact
                                                    name={"ConfigurationLists"}
                                                    path="/configuration/:domain/:code"
                                                    component={ListConfigurationBase}
                                                />
                                                <Route
                                                    exact
                                                    name={"ConfigurationDetailsById"}
                                                    path="/configuration/:domain/:code/:id"
                                                    component={ConfigurationDetailsByIdBase}
                                                />
        
                                                <Route path="/PS">
                                                    <PSremote />
                                                </Route>
        
                                                <Route path="/beneficiaire">
                                                    <BenefRemote />
                                                </Route>
        
                                                <Route path={["/paiement", "/virements"]}>
                                                    <PayementRemote />
                                                </Route>
                                                
                                                <Route path={["/intraitables", "/serviceEnLigne", "/factures"]}>
                                                    {/*<UnauthenticatedTemplate>*/}
                                                        <HospiRemote />
                                                    {/*</UnauthenticatedTemplate>*/}
                                                </Route>
                                        
                                        </Switch>
                                    </Box>
                                </Box>
                                </MsalAuthenticationTemplate>
                            </MsalProvider>
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
