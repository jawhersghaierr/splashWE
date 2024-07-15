import React, { useEffect, useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { createForm } from "final-form";
import { CustomTextField, LoadingDots, MetaError } from "shared_lib_ui/Lib/components";
import { Button, Typography } from "@mui/material";
import { ConfirmDialogModal } from "shared_lib_ui/Lib/layout/modals";
import { BaseDialogModal } from "shared_lib_ui/Lib/AdvancedFormDialog";
import { Switch } from "shared_lib_ui/Lib/components";
import "./dialog.scss";
import MyEditor from "./TextEditor";
import { useSplashScreen } from "../providers/SplashScreenContext";

const CreateSplash = ({ opened, onClose, onOpen, onSave, initialContent }) => {
    const { setContentSplash, contentSplash } = useSplashScreen();

    const [openConfirmAction, setOpenConfirmAction] = useState(false);
    const [loading, setLoading] = useState(true);

    const [currentContent, setCurrentContent] = useState("");



    const onCloseModal = () => {
        onClose();
    };

    return (
        <>
            <BaseDialogModal
                open={opened}
                className={"border-gradient border-gradient-green only-top"}
                styles={{ width: "100%", minHeight: "700px" }}
                listbuttons={[
                    {
                        id: 0,
                        type: "button",
                        text: "ANNULER",
                        variant: "contained",
                        color: "secondary",
                        action: () => onCloseModal(),
                    },
                    {
                        id: 1,
                        type: "button",
                        text: "CREER",
                        variant: "contained",
                        color: "primary",
                        action: () => onSave(),
                    },
                ]}
                close={onCloseModal}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        margin: "20px 0 0 0",
                    }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            marginBottom: "34px",
                        }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                fontWeight: "600",
                                color: theme => theme.palette.grey.grey9,
                            }}>
                            Créer une
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                fontWeight: "500",
                                color: theme => theme.palette.primary.main,
                            }}>
                            {"Splash screen"}
                        </Typography>
                    </div>

                    <div>
                        <div className="App">
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                                <CustomTextField
                                    style={{ width: "75%" }}
                                    id="label"
                                    name="label"
                                    label={"Libéllé"}
                                    placeholder={"ex: Splash screen ouverture service en ligne"}
                                    onChange={(e) => setContentSplash({ ...contentSplash, label: e.target.value })}
                                />

                                <div>
                                    <Typography variant="description" noWrap component="span" sx={{ marginRight: "8px" }}>
                                        {"Activer pour diffuser"}
                                    </Typography>
                                    <Switch checked={contentSplash.status} onChange={() => setContentSplash({ ...contentSplash, status: !contentSplash.status })} />
                                </div>

                            </div>

                            <MyEditor initialContent={currentContent} onSave={onSave} />
                        </div>
                    </div>
                </div>
            </BaseDialogModal>

            <ConfirmDialogModal opened={openConfirmAction} onClose={() => setOpenConfirmAction(false)} loading={loading}>
                <div
                    style={{
                        width: "420px",
                        height: "345px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        justifyContent: "center",
                        marginBottom: "34px",
                    }}>
                    <Typography
                        component="div"
                        variant="h5"
                        sx={{
                            color: theme => theme.palette.grey.grey9,
                            textAlign: "center",
                        }}>
                        {"C'est crée"}
                    </Typography>

                    <Button
                        type="button"
                        variant="contained"
                        size="medium"
                        onClick={() => {
                            setOpenConfirmAction(false);
                            onOpen && onOpen();
                            refetch && refetch();
                        }}>
                        AJOUTER UN AUTRE RIB
                    </Button>

                    <Button
                        type="button"
                        variant="text"
                        color="info"
                        size="medium"
                        onClick={() => {
                            setOpenConfirmAction(false);
                            onClose && onClose();
                            refetch && refetch();
                        }}>
                        PAS MAINTENANT
                    </Button>
                </div>
            </ConfirmDialogModal>
        </>
    );
};

export default CreateSplash;
