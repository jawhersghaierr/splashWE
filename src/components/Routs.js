import React, { Suspense, useState, useEffect } from "lib_ui/react";
import { Switch, Route } from "lib_ui/react-router-dom";
import { useSelector } from "lib_ui/react-redux";
import Box from "@mui/material/Box";
import { NotFound } from "shared_lib_ui/Lib/components";
import { TermsService } from "shared_lib_ui/Lib/layout";

import RemotePsApp from "ps_ui/RemotePsApp";
import RemoteBenefApp from "benef_ui/RemoteBenefApp";
import RemoteHospiApp from "hospi_ui/RemoteHospiApp";
import RemotePayementApp from "payment_ui/RemotePayementApp";
import RemoteIntraitablesApp from "intraitables_ui/RemoteIntraitablesApp";
import RemoteTPSApp from "tps_ui/RemoteTPSApp";
import RemoteInduApp from "indu_ui/RemoteInduApp";
import RemoteAuthApp from "auth_ui/RemoteAuthApp";
import Home from "./Home";
import { getClaims } from "shared_lib_ui/host";
import { isAuthenticated } from "shared_lib_ui/host";
import { GetMultiModuleClaims } from "auth_ui/RemoteAuthApp";
import { MODULES } from "../utils/consts";
import Footer from "./Footer";

const PSremote = () => <RemotePsApp />;
const BenefRemote = props => <RemoteBenefApp {...props} />;
const PayementRemote = () => <RemotePayementApp />;
const HospiRemote = () => <RemoteHospiApp />;
const TPSRemote = () => <RemoteTPSApp />;
const InduRemote = () => <RemoteInduApp />;
const IntraitablesRemote = () => <RemoteIntraitablesApp />;
const AuthRemote = () => <RemoteAuthApp />;

const Routs = () => {
    const moduleClaims = useSelector(getClaims);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
            }}>
            {!moduleClaims?.isSuccess && <GetMultiModuleClaims modules={MODULES} />}
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

                <Route path={["/hospidashboard", "/serviceEnLigne", "/factures", "/intraitables", "/parametres"]}>
                    <HospiRemote />
                </Route>

                <Route path={["/tpsdashboard", "/tpsFactures/create", "/tpsFactures", "/TpAmcFluxInfo", "/tpAmcServiceEnLigne"]}>
                    <TPSRemote />
                </Route>

                <Route path={["/indusdashboard", "/indus", "/indus/create", "/remboursements"]}>
                    <InduRemote />
                </Route>

                <Route path={["/intraitablesdashboard", "/facturesintraitables", "/intraitables"]}>
                    <IntraitablesRemote />
                </Route>

                <Route path="/auth">
                    <AuthRemote />
                </Route>

                <Route path={["/not-found", "*"]} component={NotFound} />
            </Switch>
            <Footer />
        </Box>
    );
};
export default Routs;
