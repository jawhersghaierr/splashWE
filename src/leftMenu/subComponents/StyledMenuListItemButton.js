import styled from "@mui/material/styles/styled";
import ListItemButton from "@mui/material/ListItemButton";

export const StyledMenu = styled(ListItemButton)(({ theme }) => {
    return {
        backgroundColor: "transparent",
        outline: "0px",
        border: "0px",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        color: "inherit",
        display: "flex",
        //-moz-box-flex: 1,
        flexGrow: 1,
        //-moz-box-pack: "start",
        justifyContent: "flex-start",
        //-moz-box-align: "center",
        alignItems: "center",
        position: "relative",
        textDecoration: "none",
        minWidth: "0px",
        boxSizing: "border-box",
        textAlign: "left",
        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        width: "280px",
        margin: "0px auto",
        borderRadius: "12px",
        padding: "8px 16px !important",
        //'&:hover': { background: `linear-gradient(to bottom, ${theme.palette.primary.main}, #1AC6D6)` },
    };
});

export default StyledMenu;
