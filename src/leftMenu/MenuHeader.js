import React from "lib_ui/react";
import Box from "@mui/material/Box";
import { icons } from "shared_lib_ui/assets";
import Logo from '../../assets/images/Logo.png'

const { LogoIcon, LogoTextIcon, ArrowSquareLeft, ArrowSquareRight } = icons;

const MenuHeader = (props) => {
    const { open, openLeftDrawer, closeLeftDrawer } = props;

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
                    onClick={openLeftDrawer}
                    viewBox="0 0 50 50"
                    sx={{
                        margin: "1.4em 0.9em 0.6em 1.1em",
                        fontSize: "2.5em !important",
                        cursor: "pointer"
                    }}
                />
            )}
            {open && (
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-around",
                        alignItems: "self-end",
                    }}
                >
                    <img src={Logo} width={'65%'} style={{ alignSelf: 'self-end!important', margin: '0 0 0 30px' }}
                    
                    />
                    {/*<LogoIcon*/}
                    {/*    viewBox="0 0 35 35"*/}
                    {/*    sx={{*/}
                    {/*        flex: "1 0 auto",*/}
                    {/*        height: "1.3em !important",*/}
                    {/*        fontSize: "3em !important",*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*<LogoTextIcon*/}
                    {/*    viewBox="0 0 100 30"*/}
                    {/*    sx={{*/}
                    {/*        flex: "2 0 auto",*/}
                    {/*        margin: "0.5em auto auto !important",*/}
                    {/*        height: "2em !important",*/}
                    {/*        fontSize: "3em !important",*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <ArrowSquareLeft
                        viewBox="0 0 50 50"
                        onClick={closeLeftDrawer}
                        sx={{
                            flex: "1 0 auto",
                            margin: "1.4em auto 0.1em !important",
                            fontSize: "2.5em !important",
                            cursor: "pointer"
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default MenuHeader;
