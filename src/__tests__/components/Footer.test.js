import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
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
