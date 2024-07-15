import React, { useEffect, useRef, useState } from "react";
import { CustomTextField, LoadingDots, MetaError } from "shared_lib_ui/Lib/components";
import { Button, Typography } from "@mui/material";
import { ConfirmDialogModal } from "shared_lib_ui/Lib/layout/modals";
import { BaseDialogModal } from "shared_lib_ui/Lib/AdvancedFormDialog";
import { Switch } from "shared_lib_ui/Lib/components";
import "./dialog.scss";
import MyEditor from "./TextEditor";
import { useSplashScreen } from "../providers/SplashScreenContext";
import { useSelector } from "react-redux";
import { isPS, isAuthenticated, getBaseClaims } from "shared_lib_ui/host";

const SplashScreen = ({ opened, onClose }) => {
  const { currentSplash, dismissSplashScreen, startSplashScreenInterval, handleShowSplash, setHandleShowSplash, updateConsultedStatusPerUser, splashUserConetnt } = useSplashScreen();
  const { isPs } = useSelector(isPS);








  const onCloseModal = () => {
    console.log("splashUserConetnt", splashUserConetnt);
    updateConsultedStatusPerUser(splashUserConetnt?.id);
  };

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
              {splashUserConetnt?.splashScreen && splashUserConetnt.splashScreen?.label}
            </Typography>
          </div>

          <div>
            <div style={{ width: "540px" }} className="App">
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <div dangerouslySetInnerHTML={{ __html: splashUserConetnt ? splashUserConetnt?.splashScreen?.content : "" }}></div>

              </div>

            </div>
          </div>
        </div>
      </BaseDialogModal >

    </>
  );
};

export default SplashScreen;
