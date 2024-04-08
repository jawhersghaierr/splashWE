import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Link: jest.fn(({ to, children }) => <div data-testid={to}>{children}</div>),
}));

describe("Footer Component", () => {
    render(<Footer />);
    test("renders terms of service", () => {
        expect(screen.getByTestId("/terms/terms-of-service")).toBeInTheDocument();
    });
    test("renders legal notice", () => {
        expect(screen.getByTestId("/terms/legal-notice")).toBeInTheDocument();
    });
    test("renders terms", () => {
        expect(screen.getByTestId("/terms")).toBeInTheDocument();
    });
    test("renders data protection policy", () => {
        expect(screen.getByTestId("/terms/personal-data-protection-policy")).toBeInTheDocument();
    });
});
