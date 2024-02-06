import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import NavigationItem from "../../../leftMenu/subComponents/NavigationItem";

// Mock the useHistory hook
jest.mock("lib_ui/react-router-dom", () => ({
    ...jest.requireActual("lib_ui/react-router-dom"),
    useHistory: jest.fn(),
    matchPath: jest.fn(),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    useLocation: jest.fn(),
    matchPath: jest.fn(() => true),
    NavLink: jest.fn(() => "NavLink"),
}));

describe("NavigationItem Component", () => {
    it("renders NavigationItem component", async () => {
        const props = {
            code: ["HFAC", "ROC", "TPS", "TPAMC", "FIN", "DRB", "PAI", "INDU", "PS"],
            name: "Accueil",
            path: "/",
            children: [],
            collapsed: false,
            tabIndex: 0,
        };
        render(<NavigationItem {...props} />);

        await waitFor(() => {
            expect(screen.getByText("NavLink")).toBeInTheDocument();
        });
    });
});
