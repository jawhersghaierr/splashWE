import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import theme from "../public/assets/theme";

const AllTheProviders = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
