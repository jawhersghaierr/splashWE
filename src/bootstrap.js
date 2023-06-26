import React, { Suspense, useState, useEffect } from "lib_ui/react";
import { Switch, Route, BrowserRouter } from "lib_ui/react-router-dom";
import ReactDOM from "lib_ui/react-dom";
import { Provider } from "lib_ui/react-redux";

import configurationsReducer from "./components/configurations/configurationsSlice";

import { Typography, CssBaseline } from "@mui/material";
import {
    StyledEngineProvider,
    ThemeProvider,
    // createTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Divider from '@mui/material/Divider';

import { RightDrawerProvider } from "shared_lib_ui/Lib/layout/drawers";

import { store } from "shared_lib_ui/store";
import { Drawer } from "shared_lib_ui/Lib/layout/drawers";

import MenuHeader from "./leftMenu/MenuHeader";
import HostMenu from "./leftMenu/HostMenu";

import ConfigurationDetailsById from "./components/configurations/ConfigurationDetailsById";
import { ListConfiguration } from "./components/configurations/ListConfiguration";
import { Configurations } from "./components/configurations/Configurations";

// import LogoIcon from '../assets/icons/LogoIcon';
// import LogoTextIcon from '../assets/icons/LogoTextIcon';

import RemotePsApp from "ps_ui/RemotePsApp";
import RemoteBenefApp from "benef_ui/RemoteBenefApp";
import RemoteHospiApp from "hospi_ui/RemoteHospiApp";
import RemotePayementApp from "payment_ui/RemotePayementApp";

import theme from "shared_lib_ui/MUItheme";

// let theme = createTheme({
//   typography: {
//     allVariants: {
//       fontFamily: "Gotha",
//       textTransform: "none",
//     },
//   },
//   boldTypography: {
//     fontWeight: "inherit",
//   },
// });

const PageDashboard = () => (
    <Typography variant="h5" noWrap component="div" sx={{ padding: "15px 25px", color: "#003154" }}>
        <b>Dashboard Page</b>
    </Typography>
);

const PSremote = () => <RemotePsApp store={store} />;
const BenefRemote = (props) => <RemoteBenefApp store={store} {...props} />;
const PayementRemote = () => <RemotePayementApp store={store} />;
const HospiRemote = (props) => <RemoteHospiApp store={store} {...props} />;

const ConfigurationBase = () => <Configurations store={store} />;
const ListConfigurationBase = () => <ListConfiguration store={store} />;
const ConfigurationDetailsByIdBase = () => <ConfigurationDetailsById store={store} />;

const App = () => {
    const [open, setOpen] = useState(true);
    const [shown, setShown] = useState(true);

    useEffect(() => {
        store.injectReducer("configurations", configurationsReducer);
    }, []);

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <RightDrawerProvider>
                    <BrowserRouter>
                        <Suspense fallback="Loading...">
                            <Box sx={{ display: "flex" }}>
                                <CssBaseline />
                                {shown && (
                                    <Drawer variant="permanent" open={open}>
                                        <MenuHeader open={open} handleDrawer={handleDrawer} />
                                        <HostMenu collapsed={!open} />
                                    </Drawer>
                                )}
                                <Box component="main" sx={{ flexGrow: 1 }}>
                                    <Switch>
                                        <Route exact path="/" component={PageDashboard} />

                                        <Route
                                            exact={true}
                                            index={true}
                                            name={"Configuration"}
                                            path="/configuration"
                                            component={ConfigurationBase}
                                        />
                                        <Route
                                            exact={true}
                                            name={"ConfigurationLists"}
                                            path="/configuration/:domain/:code"
                                            component={ListConfigurationBase}
                                        />
                                        <Route
                                            exact={true}
                                            name={"ConfigurationDetailsById"}
                                            path="/configuration/:domain/:code/:id"
                                            component={ConfigurationDetailsByIdBase}
                                        />

                                        <Route path="/PS">
                                            <PSremote />
                                        </Route>
                                        <Route path="/beneficiaire">
                                            <BenefRemote openMenu={setOpen} />
                                        </Route>

                                        <Route path="/paiement">
                                            <PayementRemote />
                                        </Route>
                                        <Route path="/virements">
                                            <PayementRemote />
                                        </Route>

                                        <Route
                                            path={["/intraitables", "/serviceEnLigne", "/factures"]}
                                            render={(props) => <HospiRemote menu={setShown} />}
                                        />
                                    </Switch>
                                </Box>
                            </Box>
                        </Suspense>
                    </BrowserRouter>
                </RightDrawerProvider>
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
