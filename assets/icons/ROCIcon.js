import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

export default function ROCIcon(props) {
    return (
        <SvgIcon {...props}>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29 20H32V33H20V20H23" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <rect x="32" y="25" width="5" height="8" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <rect x="24" y="29" width="4" height="4" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <rect x="15" y="25" width="5" height="8" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <path
                    d="M26 16.25C25.2583 16.25 24.5333 16.4699 23.9166 16.882C23.2999 17.294 22.8193 17.8797 22.5355 18.5649C22.2516 19.2502 22.1774 20.0042 22.3221 20.7316C22.4668 21.459 22.8239 22.1272 23.3484 22.6516C23.8728 23.1761 24.541 23.5332 25.2684 23.6779C25.9958 23.8226 26.7498 23.7484 27.4351 23.4645C28.1203 23.1807 28.706 22.7001 29.118 22.0834C29.5301 21.4667 29.75 20.7417 29.75 20C29.75 19.5075 29.653 19.0199 29.4645 18.5649C29.2761 18.11 28.9999 17.6966 28.6516 17.3484C28.3034 17.0001 27.89 16.7239 27.4351 16.5355C26.9801 16.347 26.4925 16.25 26 16.25Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M25 20L27 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M26 19L26 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </SvgIcon>
    );
}
