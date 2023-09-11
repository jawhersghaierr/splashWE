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
import {MsalAuthenticationTemplate} from "@azure/msal-react";
import {InteractionType} from "@azure/msal-browser";
import {MsalProvider} from "@azure/msal-react";
import {msalInstance} from "./msal";
import {useMsal} from "@azure/msal-react";
import {SignInLink} from "./components/SignIn";
import {SignOutLink} from "./components/SignOut";
/*
import { PublicClientApplication } from "@azure/msal-browser";
const msalConfig = {
    auth: {
        clientId: 'cb80b654-41fb-43dd-bb34-c802089d0d12',
        authority: 'https://integrationviamedisb2c.b2clogin.com/integrationviamedisb2c.onmicrosoft.com/B2C_1_si_email',
        knownAuthorities: ["integrationviamedisb2c.b2clogin.com"],
        redirectUri: "http://localhost:8030/",
        postLogoutRedirectUri: "http://localhost:8030/"
        
    }
};

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();


const login = async () => {
    try {
        const loginResponse = await msalInstance.loginPopup({});
    } catch (err) {
        console.log('Err > ', err)
    }
    
}
*/

const PageDashboard = () => (
    <Typography variant="h3" noWrap component="div" sx={{ padding: "15px 25px", color: "#003154" }}>
        Dashboard Page
        <br/>
        <SignInLink/>
        <br/>
        <SignOutLink/>
    </Typography>
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
    }, []);

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <DrawerProvider>
                    <MsalProvider instance={msalInstance}>
                    
                        <BrowserRouter>
                            <Suspense fallback="Loading...">
                                <MsalAuthenticationTemplate
                                    interactionType={InteractionType.Popup}
                                    // authenticationRequest={window._env_.msalConfig.loginRequest}
                                    // errorComponent={"error"}
                                    // loadingComponent={"loading"}
                                >
                                    
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
                                                    <HospiRemote />
                                                </Route>
                                            </Switch>
                                        </Box>
                                    </Box>
                                </MsalAuthenticationTemplate>
                            </Suspense>
                        </BrowserRouter>
                    </MsalProvider>
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
