import React from "lib_ui/react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

jest.mock("lib_ui/react-router-dom", () => ({
    ...jest.requireActual("lib_ui/react-router-dom"),
    Link: jest.fn(({ to, children }) => <div data-testid={to}>{children}</div>),
}));

describe("Footer Component", () => {
    it("renders Footer", () => {
        render(<Footer />);

        expect(screen.getByTestId("/terms/terms-of-service")).toBeInTheDocument();
        expect(screen.getByTestId("/terms/legal-notice")).toBeInTheDocument();
        expect(screen.getByTestId("/terms")).toBeInTheDocument();
        expect(screen.getByTestId("/terms/personal-data-protection-policy")).toBeInTheDocument();
    });
});
