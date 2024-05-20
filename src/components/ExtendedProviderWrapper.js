import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { DrawerProvider } from "shared_lib_ui/Lib/layout/drawers";
import { useSelector } from "react-redux";

// Cookies
import { useCookies } from "react-cookie";
import { AccepterCookie } from "shared_lib_ui/Lib/layout";

// Token & Claims
import { RefreshTokenPrompt } from "shared_lib_ui/auth";
import { getClaims, getPlatformsAndContexts } from "shared_lib_ui/host";
import { GetMultiModuleClaims } from "auth_ui/RemoteAuthApp";
import { MODULES } from "../utils/consts";

// IdleTimer
import { timeout, promptBeforeIdle } from "shared_lib_ui/Lib";
import { IdleTimerProvider } from "react-idle-timer";

import Routs from "./Routs";

const ExtendedProviderWrapper = () => {
    const { codePlateform } = useSelector(getPlatformsAndContexts);

    const moduleClaims = useSelector(getClaims);
    const [cookies] = useCookies([]);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [promptOpen, setPromptOpen] = useState(false);

    useEffect(() => {
        if (Object.keys(cookies)?.length === 0) {
            setOpenConfirmDialog(true);
        }
    }, [cookies]);

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
                        <RefreshTokenPrompt open={promptOpen} />

                        <AccepterCookie opened={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} />

                        {!moduleClaims?.isSuccess && codePlateform && <GetMultiModuleClaims modules={MODULES} />}

                        <Routs />
                    </IdleTimerProvider>
                </Suspense>
            </DrawerProvider>
        </BrowserRouter>
    );
};
export default ExtendedProviderWrapper;
