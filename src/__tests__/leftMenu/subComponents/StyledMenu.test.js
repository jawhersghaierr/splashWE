import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import StyledMenu from "../../../leftMenu/subComponents/StyledMenu";

jest.mock(
    "shared_lib_ui/Lib",
    () => ({
        __esModule: true,
        useWindowDimensions: jest.fn(() => ({
            height: 400,
        })),
    }),
    { virtual: true },
);

describe("StyledMenu Component", () => {
    it("renders StyledMenu component", async () => {
        render(<StyledMenu />);

        await waitFor(() => {
            expect(screen.getByRole("menu")).toBeInTheDocument();
        });
    });
});
