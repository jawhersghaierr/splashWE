import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import store from "shared_lib_ui/store";
import { Provider } from "react-redux";
import Home from "../../../components/mainDashboard/Home";

// Mock the baseApi module
jest.mock(
    "shared_lib_ui/services/baseApi",
    () => ({
        useGetUserInfoQuery: jest.fn(),
    }),
    { virtual: true },
);

// Mocking the ArchiveBook icon
jest.mock(
    "shared_lib_ui/assets",
    () => ({
        icons: {
            ArchiveBook: () => <div>ArchiveBook Icon</div>,
        },
    }),
    { virtual: true },
);

jest.mock(
    "shared_lib_ui/Lib/layout",
    () => ({
        MainSection: jest.fn(({ children }) => <div>{children}</div>),
        BoxSection: jest.fn(({ children }) => <div>{children}</div>),
        Dashboard: jest.fn(() => <div data-testid="dashboard">Dashboard</div>),
    }),
    { virtual: true },
);

jest.mock(
    "shared_lib_ui/host",
    () => ({
        getUser: jest.fn(),
        isPS: jest.fn(() => true),
        isAuthenticated: jest.fn(() => true),
        getBaseClaims: jest.fn(() => ["ROC"]),
    }),
    { virtual: true },
);

jest.mock(
    "shared_lib_ui/services",
    () => ({
        baseApi: jest.fn(),
    }),
    { virtual: true },
);

jest.mock(
    "shared_lib_ui/Lib/components",
    () => ({
        RemoteApi: jest.fn(),
        LoadingDots: jest.fn(() => <div data-testid="loading-dots">Mocked LoadingDots</div>),
    }),
    { virtual: true },
);

// Mock useSelector
jest.mock("lib_ui/react-redux", () => ({
    ...jest.requireActual("lib_ui/react-redux"), // Use the actual implementation for other hooks if needed
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
    useStore: jest.fn(),
}));

// Mock the store
jest.mock(
    "shared_lib_ui/store",
    () => ({
        __esModule: true,
        default: {
            // Your mocked store state goes here
            // For example:
            getState: jest.fn(() => ({
                /* mocked state */
            })),
            dispatch: jest.fn(),
            subscribe: jest.fn(),
            // Add other store methods as needed
        },
    }),
    { virtual: true },
);

describe("Home Component", () => {
    it("renders loading state and then renders Dashboard on successful data fetch", async () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>,
        );
        await waitFor(() => {
            expect(screen.getByTestId("dashboard")).toBeInTheDocument();
        });
    });
});