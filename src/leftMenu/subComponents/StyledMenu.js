import styled from "@mui/material/styles/styled";
import MenuList from "@mui/material/MenuList";
import { useWindowDimensions } from "shared_lib_ui/Lib";

export const StyledMenu = styled(MenuList)(({ theme }) => {
    const { height } = useWindowDimensions();
    return {
        height: height - 300,
        padding: "0px",
        overflowY: "auto",
        overflowX: "hidden",
        scrollbarWidth: "thin" /* Firefox 63 compatibility */,
        "&::-webkit-scrollbar": {
            width: "6px !important",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#F5F5F5 !important",
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px !important",
            boxShadow: "inset 0 0 6px rgba(0,0,0,.3) !important",
            backgroundColor: "#F5F5F5 !important",
        },
        "& .MuiListItemButton-root:hover": {
            backgroundColor: theme => theme.palette.primary.hover,
        },
    };
});

export default StyledMenu;
