import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import StyledMenuListItemButton from "../../../leftMenu/subComponents/StyledMenuListItemButton";

describe("StyledMenu Component", () => {
    it("renders StyledMenu component", async () => {
        render(<StyledMenuListItemButton />);

        await waitFor(() => {
            expect(screen.getByRole("button")).toBeInTheDocument();
        });
    });
});
