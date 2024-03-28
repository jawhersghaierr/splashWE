import React from "react";
import { render, screen } from "@testing-library/react";
import Routs from "../components/Routs";

jest.mock(
    "notistack",
    () => ({
        SnackbarProvider: jest.fn(({ children }) => <div>{children}</div>),
    }),
    { virtual: true },
);

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Switch: jest.fn(({ children }) => <div>{children}</div>),
    Route: jest.fn(({ path }) => <div>{Array.isArray(path) ? path.join(", ") : path}</div>),
}));

jest.mock(
    "shared_lib_ui/Lib/layout/modals",
    () => ({
        AlertMsgs: jest.fn(),
    }),
    { virtual: true },
);

jest.mock(
    "shared_lib_ui/Lib/layout/drawers",
    () => ({
        useDrawer: jest.fn(() => ({
            isOpenLeftDrawer: false,
            isShownLeftDrawer: false,
            openLeftDrawer: jest.fn(),
            closeLeftDrawer: jest.fn(),
        })),
        Drawer: jest.fn(() => <div data-testid="Drawer" />),
    }),
    { virtual: true },
);

jest.mock("shared_lib_ui/Lib/components", () => ({ NotFound: <div data-testid="NotFound" /> }), { virtual: true });
jest.mock("shared_lib_ui/Lib/layout", () => ({ TermsService: <div data-testid="TermsService" /> }), { virtual: true });

jest.mock("../components/mainDashboard/Home", () => <div data-testid="Home" />, { virtual: true });
jest.mock("../leftMenu/HostMenu", () => "HostMenu", { virtual: true });
jest.mock("../components/Footer", () => <div data-testid="Footer" />, { virtual: true });

jest.mock("ps_ui/RemotePsApp", () => jest.fn(() => <div data-testid="RemotePsApp" />), { virtual: true });
jest.mock("benef_ui/RemoteBenefApp", () => <div data-testid="RemoteBenefApp" />, { virtual: true });
jest.mock("hospi_ui/RemoteHospiApp", () => <div data-testid="RemoteHospiApp" />, { virtual: true });
jest.mock("payment_ui/RemotePayementApp", () => <div data-testid="RemotePayementApp" />, { virtual: true });
jest.mock("intraitables_ui/RemoteIntraitablesApp", () => <div data-testid="RemoteIntraitablesApp" />, { virtual: true });
jest.mock("tps_ui/RemoteTPSApp", () => <div data-testid="RemoteTPSApp" />, { virtual: true });
jest.mock("indu_ui/RemoteInduApp", () => <div data-testid="RemoteInduApp" />, { virtual: true });
jest.mock("auth_ui/RemoteAuthApp", () => <div data-testid="RemoteAuthApp" />, { virtual: true });

describe("Routes", () => {
    test("check routed config", () => {
        render(<Routs />);
        expect(screen.getByText("/")).toBeInTheDocument();
        expect(screen.getByText("/auth")).toBeInTheDocument();
    });
});
