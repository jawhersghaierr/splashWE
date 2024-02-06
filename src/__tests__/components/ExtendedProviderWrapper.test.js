import React from "lib_ui/react";
import { BrowserRouter, MemoryRouter } from "lib_ui/react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ExtendedProviderWrapper from "../../components/ExtendedProviderWrapper";

import * as _reactRedux from "lib_ui/react-redux";

jest.mock(
    "shared_lib_ui/Lib/layout/drawers",
    () => ({
        useDrawer: jest.fn(() => ({
            getDrawerId: jest.fn(),
            setDrawerId: jest.fn(),
            isOpenRightDrawer: false,
            openRightDrawer: jest.fn(),
            rightDrawerRef: { current: null },
            setDrawerTitle: jest.fn(),
            setDrawerSubtitle: jest.fn(),
        })),
    }),
    { virtual: true },
);

jest.mock(
    "shared_lib_ui/Lib/layout",
    () => ({
        AccepterCookie: jest.fn(() => <div data-testid="AccepterCookie"></div>),
    }),
    { virtual: true },
);

jest.mock(
    "shared_lib_ui/auth",
    () => ({
        RefreshTokenPrompt: jest.fn(() => <div data-testid="RefreshTokenPrompt"></div>),
    }),
    { virtual: true },
);

jest.mock(
    "shared_lib_ui/host",
    () => ({
        getClaims: jest.fn(() => []),
    }),
    { virtual: true },
);

jest.mock(
    "auth_ui/RemoteAuthApp",
    () => ({
        GetMultiModuleClaims: jest.fn(() => []),
    }),
    { virtual: true },
);

jest.mock(
    "shared_lib_ui/Lib",
    () => ({
        timeout: jest.fn(() => []),
        promptBeforeIdle: jest.fn(() => []),
    }),
    { virtual: true },
);

jest.mock(
    "shared_lib_ui/store",
    () => ({
        __esModule: true,
        default: {
            getState: jest.fn(() => ({})),
            dispatch: jest.fn(),
            subscribe: jest.fn(),
        },
    }),
    { virtual: true },
);

jest.mock("lib_ui/react-router-dom", () => ({
    ...jest.requireActual("lib_ui/react-router-dom"),
    useSelector: jest.fn(),
    BrowserRouter: ({ children }) => <div data-testid="BrowserRouter"></div>,
}));

jest.mock("../../components/Routs", () => <div data-testid="Routs"></div>, { virtual: true });

describe("Routs Component", () => {
    it("renders Routs", () => {
        const mockSelector = jest.fn();
        _reactRedux.useSelector.mockReturnValue(mockSelector);

        render(<ExtendedProviderWrapper />);

        expect(screen.getByTestId("BrowserRouter")).toBeInTheDocument();
    });
});
