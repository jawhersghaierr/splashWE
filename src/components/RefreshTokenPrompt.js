import React, { useState, useEffect } from "lib_ui/react";
import { useIdleTimerContext } from "lib_ui/react-idle-timer";
import { msalInstance, acquireAccessToken } from "shared_lib_ui/auth";
import { BaseDialogModal } from "shared_lib_ui/Lib/layout/modals";
import Typography from "@mui/material/Typography";

export default function RefreshTokenPrompt(props) {
    const { open } = props;
    const [remaining, setRemaining] = useState(0);

    const { activate, pause, getRemainingTime } = useIdleTimerContext();

    const setActive = () => {
        activate();
        newToken = acquireAccessToken();
    };

    let newToken = null;

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000));
        }, 500);

        return () => {
            clearInterval(interval);
            if (getRemainingTime() == 0) {
                // pause();
                msalInstance.logoutRedirect();
            }
        };
    }, [getRemainingTime()]);

    return (
        <BaseDialogModal
            open={open}
            closeButton={{ display: false }}
            listbuttons={[
                {
                    id: 1,
                    text: "Rester connecté",
                    color: "primary",
                    action: setActive,
                },
            ]}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "350px",
                    minHeight: "120px",
                    padding: "45px 24px",
                    gap: "45px",
                }}>
                <Typography component="div" variant="h5" sx={{ color: theme => theme.palette.success.main, textAlign: "center" }}>
                    Votre session est en train d'expirer. Vous serez automatiquement déconnecté
                </Typography>
                <Typography component="div" variant="subtitle1" sx={{ color: theme => theme.palette.grey.grey9, textAlign: "center" }}>
                    Déconnexion en {remaining} secondes
                </Typography>
            </div>
        </BaseDialogModal>
    );
}
