import React, { useEffect, useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import { BaseDialogModal } from "shared_lib_ui/Lib/AdvancedFormDialog";
import "./dialog.scss";
import { useSplashScreen } from "../../providers/SplashScreenContext";
import { SearchGridWrapper, Pagination } from "shared_lib_ui/Lib/grids";
import { columns } from "./SplashDetailsColumn";

const SplashDetails = ({ opened, onClose, onOpen }) => {
    const { idSplash, getSplashDetails, isFetching, isSuccess, error, revokeStatus } = useSplashScreen();
    const [splashDetailsData, setSplashDetailsData] = useState(null);

    const onCloseModal = () => {
        onClose();
    };

    const getRowId = (row) => `${row.id}`;

    const handleActive = (id) => {
        revokeStatus(id).then(() => {
            if (isSuccess) {
                getSplashDetails(idSplash);
                onCloseModal();
                setTimeout(() => {
                    onOpen();
                }
                    , 10);
            }
        }
        );
    };


    useEffect(() => {
        if (opened) {
            getSplashDetails(idSplash).then((res) => {
                console.log("res", res);
                setSplashDetailsData(res);
            });
        }
    }
        , [opened]);

    return (
        <>
            <BaseDialogModal
                open={opened}
                className={"border-gradient border-gradient-green only-top"}
                styles={{ width: "100%", minHeight: "700px" }}

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

                        </Typography>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{
                                fontWeight: "500",
                                color: theme => theme.palette.primary.main,
                            }}>
                            Liste des utilisateurs consultés
                        </Typography>
                    </div>

                    <div>
                        <div style={{ width: "840px" }} className="App">
                            {isFetching && <div>Chargement...</div>}
                            {splashDetailsData?.length > 0 &&
                                <SearchGridWrapper
                                    rowHeight={50}
                                    getRowId={getRowId}
                                    showProgress={isFetching}
                                    showNoSearchResults={!isFetching && isSuccess && (!splashDetailsData || splashDetailsData && splashDetailsData?.length === 0)}
                                    showNoData={!isFetching && !splashDetailsData && !error}
                                    showGrid={!isFetching && isSuccess && splashDetailsData && splashDetailsData?.length > 0}
                                    columns={columns({ handleActive: handleActive })}
                                    pageSize={12}
                                    rows={splashDetailsData}

                                />
                            }

                        </div>
                    </div>
                </div>
            </BaseDialogModal >

        </>
    );
};

export default SplashDetails;
