import React from "react";
import { SvgIcon } from "@mui/material";

export default function DevisIcon(props) {
  return (
    <SvgIcon
      {...props}
    >
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23 23H28"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 26H29"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 29H27"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 18H29.5L33 21.5V34H20V18Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
