import React, { Suspense, useState, useEffect } from "lib_ui/react";
import { Switch, Route, BrowserRouter } from "lib_ui/react-router-dom";
import { DrawerProvider } from "shared_lib_ui/Lib/layout/drawers";
import { useSelector } from "lib_ui/react-redux";
import Box from "@mui/material/Box";
import { NotFound } from "shared_lib_ui/Lib/components";

import RemotePsApp from "ps_ui/RemotePsApp";
import RemoteBenefApp from "benef_ui/RemoteBenefApp";
import RemoteHospiApp from "hospi_ui/RemoteHospiApp";
import RemotePayementApp from "payment_ui/RemotePayementApp";
import RemoteIntraitablesApp from "intraitables_ui/RemoteIntraitablesApp";
import RemoteTPSApp from "tps_ui/RemoteTPSApp";
import RemoteInduApp from "indu_ui/RemoteInduApp";
import RemoteAuthApp from "auth_ui/RemoteAuthApp";
import Home from "./mainDashboard/Home";
import { getClaims } from "shared_lib_ui/host";
import { GetMultiModuleClaims } from "auth_ui/RemoteAuthApp";
import { MODULES } from "../utils/consts";
import Footer from "./Footer";
import CssBaseline from "@mui/material/CssBaseline";
import HostMenu from "../leftMenu/HostMenu";
import { TermsService, AccepterCookie } from "shared_lib_ui/Lib/layout";
import { RefreshTokenPrompt } from "shared_lib_ui/auth";
import { useCookies } from "react-cookie";
// IdleTimer
import { timeout, promptBeforeIdle } from "shared_lib_ui/Lib";
import { IdleTimerProvider } from "lib_ui/react-idle-timer";

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
    const moduleClaims = useSelector(getClaims);
    const [cookies] = useCookies([]);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [promptOpen, setPromptOpen] = useState(false);
    const onPromptIsIdle = () => {
        setPromptOpen(true);
    };

    const onIdle = () => {
        setPromptOpen(false);
    };

    const onActiveIsIdle = () => {
        setPromptOpen(false);
    };
    useEffect(() => {
        if (Object.keys(cookies)?.length === 0) {
            setOpenConfirmDialog(true);
        }
    }, [cookies]);

    return (
        <BrowserRouter>
            <DrawerProvider>
                <Suspense fallback="Loading...">
                    <IdleTimerProvider
                        timeout={timeout}
                        promptBeforeIdle={promptBeforeIdle}
                        throttle={500}
                        onPrompt={onPromptIsIdle}
                        onIdle={onIdle}
                        onActive={onActiveIsIdle}>
                        <Box sx={{ display: "flex" }}>
                            <CssBaseline />

                            <HostMenu />

                            <AccepterCookie opened={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} />

                            <RefreshTokenPrompt open={promptOpen} />

                            <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
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
                    </IdleTimerProvider>
                </Suspense>
            </DrawerProvider>
        </BrowserRouter>
    );
};
export default Routs;
