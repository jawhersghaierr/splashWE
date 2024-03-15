import React from "react";
import { SvgIcon } from "@mui/material";

export default function PaymentIcon(props) {
    return (
        <SvgIcon {...props}>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 24.8229V21.5L28.5 18H19V34H24.207" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="23" y="24" width="12" height="12" rx="6" stroke="white" strokeWidth="1.5" />
                <path d="M27 30.6665L28.3737 31.9999L31.1212 27.9999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </SvgIcon>
    );
}
