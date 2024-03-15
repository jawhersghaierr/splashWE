import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Footer = () => {
    return (
        <div
            id="footer"
            style={{
                alignSelf: "center",
                textAlign: "center",
                minHeight: "20px",
                padding: "5px",
                maxWidth: "90%",
            }}>
            <Link color="inherit" to="/terms/terms-of-service" style={{ textDecoration: "none" }}>
                <Typography variant="h6" noWrap component="span" sx={{ color: theme => theme.palette.grey.grey5 }}>
                    Conditions générales
                </Typography>
            </Link>
            &nbsp; - &nbsp;
            <Link color="inherit" to="/terms/legal-notice" style={{ textDecoration: "none" }}>
                <Typography variant="h6" noWrap component="span" sx={{ color: theme => theme.palette.grey.grey5 }}>
                    Mentions légales
                </Typography>
            </Link>
            &nbsp; - &nbsp;
            <Link color="inherit" to="/terms" style={{ textDecoration: "none" }}>
                <Typography variant="h6" noWrap component="span" sx={{ color: theme => theme.palette.grey.grey5 }}>
                    Gestion des cookies
                </Typography>
            </Link>
            &nbsp; - &nbsp;
            <Link color="inherit" to="/terms/personal-data-protection-policy" style={{ textDecoration: "none" }}>
                <Typography variant="h6" noWrap component="span" sx={{ color: theme => theme.palette.grey.grey5 }}>
                    Politique de protection des données
                </Typography>
            </Link>
        </div>
    );
};
export default Footer;
