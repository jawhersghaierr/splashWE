import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import MenuHeader from "../../leftMenu/MenuHeader";

jest.mock(
    "shared_lib_ui/assets",
    () => ({
        icons: {
            ArrowSquareLeft: () => <div data-testid="ArrowSquareLeft" />,
            ArrowSquareRight: () => <div data-testid="ArrowSquareRight" />,
        },
        LogoSvg: () => <div data-testid="ViamedisLogo" />,
    }),
    { virtual: true },
);

jest.mock(
    "shared_lib_ui/Lib",
    () => ({
        isOxantis: () => false,
    }),
    { virtual: true },
);

describe("MenuHeader Component", () => {
    test("closed MenuHeader component", async () => {
        render(<MenuHeader open={false} />);

        await waitFor(() => {
            expect(screen.getByTestId("ArrowSquareRight")).toBeInTheDocument();
        });
    });

    test("opened MenuHeader component", async () => {
        render(<MenuHeader open={true} />);

        await waitFor(() => {
            expect(screen.getByTestId("ArrowSquareLeft")).toBeInTheDocument();
        });
    });
});
