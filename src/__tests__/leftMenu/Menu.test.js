import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import store from "shared_lib_ui/store";
import { Provider } from "react-redux";
import Menu from "../../leftMenu/Menu";

jest.mock(
    "shared_lib_ui/assets",
    () => ({
        icons: {
            ArchiveBook: () => <div>ArchiveBook Icon</div>,
            ContentDocument: () => <div>ContentDocument Icon</div>,
            SearchNormal: () => <div>SearchNormal Icon</div>,
            AddIcon: () => <div>AddIcon Icon</div>,
            HomeIcon: () => <div>HomeIcon Icon</div>,
            ROCIcon: () => <div>ROCIcon Icon</div>,
            PaymentIcon: () => <div>PaymentIcon Icon</div>,
            PSIcon: () => <div>PSIcon Icon</div>,
            ThirdPartyPaymentIcon: () => <div>ThirdPartyPaymentIcon Icon</div>,
            User: () => <div>User Icon</div>,
            MoneyArchive: () => <div>MoneyArchive Icon</div>,
            MoneyCardEdit: () => <div>MoneyCardEdit Icon</div>,
        },
    }),
    { virtual: true },
);

// Mock the createUUID
jest.mock(
    "shared_lib_ui/Lib",
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

jest.mock(
    "shared_lib_ui/Lib",
    () => ({
        __esModule: true,
        default: {
            useWindowDimensions: jest.fn(() => ({
                height: "400px",
            })),
            createUUID: jest.fn(() => Math.random()),
        },
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

// Mock the baseApi module
jest.mock(
    "shared_lib_ui/services/baseApi",
    () => ({
        useGetUserInfoQuery: jest.fn(),
    }),
    { virtual: true },
);

// Mock useSelector
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"), // Use the actual implementation for other hooks if needed
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
    useStore: jest.fn(),
}));

jest.mock(
    "../../../components/indus/components/induCreate/steps",
    () => ({
        step1: jest.fn(() => ({ title: "Step1", label: "Step 1 label" })),
        step2: jest.fn(() => ({ title: "Step2", label: "Step 2 label" })),
    }),
    { virtual: true },
);

jest.mock(
    "../../utils/userProfileSM",
    () => ({
        userProfileSM: jest.fn(() => [
            {
                code: ["HFAC", "ROC"],
                name: "Factures",
                icon: null,
                path: "/factures",
                children: [],
            },
        ]),
    }),
    { virtual: true },
);

describe("Menu", () => {
    test("renders loading state and then renders Menu on successful data fetch", async () => {
        render(
            <Provider store={store}>
                <Menu />
            </Provider>,
        );
        await waitFor(() => {
            expect(screen.getByTestId("loading-dots")).toBeInTheDocument();
        });
    });
});
