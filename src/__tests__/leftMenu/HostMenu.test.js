import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import HostMenu from "../../leftMenu/HostMenu";

jest.mock(
    "shared_lib_ui/Lib/layout/drawers",
    () => ({
        useDrawer: jest.fn(() => ({
            isOpenLeftDrawer: jest.fn(),
            isShownLeftDrawer: true,
            openLeftDrawer: jest.fn(),
            closeLeftDrawer: jest.fn(),
        })),
        Drawer: jest.fn(() => <div data-testid="Drawer" />),
    }),
    { virtual: true },
);

jest.mock("../../leftMenu/Menu", () => <div data-testid="Menu" />, { virtual: true });
jest.mock("../../leftMenu/MenuHeader", () => <div data-testid="MenuHeader" />, { virtual: true });
jest.mock("shared_lib_ui/auth", () => ({ userAccess: jest.fn(() => <div data-testid="userAccess" />) }), { virtual: true });

describe("HostMenu Component", () => {
    test("opened HostMenu component", async () => {
        render(<HostMenu />);

        await waitFor(() => {
            expect(screen.getByTestId("Drawer")).toBeInTheDocument();
        });
    });
});
