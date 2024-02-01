import React from "lib_ui/react";
import { Switch, Route } from "lib_ui/react-router-dom";
import Box from "@mui/material/Box";
import { NotFound } from "shared_lib_ui/Lib/components";
import { SnackbarProvider } from "lib_ui/notistack";

import RemotePsApp from "ps_ui/RemotePsApp";
import RemoteBenefApp from "benef_ui/RemoteBenefApp";
import RemoteHospiApp from "hospi_ui/RemoteHospiApp";
import RemotePayementApp from "payment_ui/RemotePayementApp";
import RemoteIntraitablesApp from "intraitables_ui/RemoteIntraitablesApp";
import RemoteTPSApp from "tps_ui/RemoteTPSApp";
import RemoteInduApp from "indu_ui/RemoteInduApp";
import RemoteAuthApp from "auth_ui/RemoteAuthApp";
import Home from "./mainDashboard/Home";
import { useDrawer } from "shared_lib_ui/Lib/layout/drawers";

import Footer from "./Footer";
import CssBaseline from "@mui/material/CssBaseline";
import HostMenu from "../leftMenu/HostMenu";

import { TermsService } from "shared_lib_ui/Lib/layout";

import TestModals from "./TestModals";
import { AlertMsgs } from "shared_lib_ui/Lib/layout/modals";

import "./snackBar.scss";

const PSremote = () => <RemotePsApp />;
const BenefRemote = props => <RemoteBenefApp {...props} />;
const PayementRemote = () => <RemotePayementApp />;
const HospiRemote = () => <RemoteHospiApp />;
const TPSRemote = () => <RemoteTPSApp />;
const InduRemote = () => <RemoteInduApp />;
const IntraitablesRemote = () => <RemoteIntraitablesApp />;
const AuthRemote = () => <RemoteAuthApp />;

const Empty = () => <div></div>;

const Routs = () => {
    const { isOpenRightDrawer } = useDrawer();

    return (
        <SnackbarProvider
            Components={{ yellowAlert: AlertMsgs.AlertMsgYellowAlert, noGridResultsAlertMsg: AlertMsgs.AlertMsgNoGridResults }}
            classes={{ containerRoot: isOpenRightDrawer ? "withDrawer" : "noDrawer" }}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />

                <HostMenu />

                <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    {/*<TestModals />*/}

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path={["/psdashboard", "/ps", "/ps/profile"]}>
                            <PSremote />
                        </Route>

                        <Route path={["/terms", "/terms/terms-of-service", "/terms/legal-notice", "/terms/personal-data-protection-policy"]}>
                            <TermsService />
                        </Route>

                        <Route path={["/benefdashboard", "/beneficiaire"]}>
                            <BenefRemote />
                        </Route>

                        <Route path={["/paiementdashboard", "/paiement", "/virements"]}>
                            <PayementRemote />
                        </Route>

                        <Route path={["/hospidashboard", "/serviceEnLigne", "/factures", "/parametres"]}>
                            <HospiRemote />
                        </Route>

                        <Route path={["/tpsdashboard", "/tpsFactures/create", "/tpsFactures", "/TpAmcFluxInfo", "/tpAmcServiceEnLigne"]}>
                            <TPSRemote />
                        </Route>

                        <Route path={["/indusdashboard", "/indus", "/indus/create", "/remboursements"]}>
                            <InduRemote />
                        </Route>

                        <Route path={["/intraitablesdashboard", "/intraitables"]}>
                            <IntraitablesRemote />
                        </Route>

                        <Route path="/auth">
                            <AuthRemote />
                        </Route>

                        <Route path={["/not-found", "*"]} component={NotFound} />
                    </Switch>
                    <Switch>
                        <Route path={["/tpAmcServiceEnLigne/FluxInfo/:id", "/serviceEnLigne/FluxInfo/:id"]} component={Empty} />
                        <Route path={["*"]} component={Footer} />
                    </Switch>
                </Box>
            </Box>
        </SnackbarProvider>
    );
};
export default Routs;
