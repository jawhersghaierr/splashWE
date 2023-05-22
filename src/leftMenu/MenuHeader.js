import React from "lib_ui/react";
import { Box } from "@mui/material";
import { icons } from "shared_lib_ui/assets";

const { LogoIcon, LogoTextIcon, ArrowSquareLeft, ArrowSquareRight } = icons;

const MenuHeader = (props) => {
  const { open, handleDrawer } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#FFF !important",
      }}
    >
      {!open && (
        <ArrowSquareRight
          onClick={handleDrawer}
          viewBox="0 0 50 50"
          sx={{
            margin: "1.4em 0.9em 0.6em 1.1em",
            fontSize: "2.5em !important",
          }}
        />
      )}
      {open && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <LogoIcon
            viewBox="0 0 35 35"
            sx={{
              flex: "1 0 auto",
              height: "1.3em !important",
              fontSize: "3em !important",
            }}
          />
          <LogoTextIcon
            viewBox="0 0 100 30"
            sx={{
              flex: "2 0 auto",
              margin: "0.5em auto auto !important",
              height: "2em !important",
              fontSize: "3em !important",
            }}
          />
          <ArrowSquareLeft
            viewBox="0 0 50 50"
            onClick={handleDrawer}
            sx={{
              flex: "1 0 auto",
              margin: "1.4em auto auto !important",
              fontSize: "2.5em !important",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default MenuHeader;
