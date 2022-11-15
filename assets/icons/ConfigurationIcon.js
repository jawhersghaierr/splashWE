import React from "react";
import { SvgIcon } from "@mui/material";

export default function ConfigurationIcon(props) {
  return (
    <SvgIcon
      {...props}
    >
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="17.5"
          y="21"
          width="17"
          height="13"
          rx="2"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M22.5 21V20C22.5 18.8954 23.3954 18 24.5 18H27.5C28.6046 18 29.5 18.8954 29.5 20V21"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <rect
          x="24.5"
          y="25"
          width="3"
          height="4"
          rx="1.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M34.5 27H27.8659M24.5488 27H17.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
