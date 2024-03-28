import React from "react";
import { render } from "@testing-library/react";
import { gestionnerCards, psCards } from "../../../components/mainDashboard/HomeModules";

jest.mock(
    "shared_lib_ui/assets",
    () => ({
        icons: {
            ArchiveBook: () => <div>ArchiveBook Icon</div>,
        },
    }),
    { virtual: true },
);
describe("HomeModules", () => {
    test("renders gestionnerCards correctly", () => {
        const { getByText } = render(
            <div>
                {gestionnerCards.map((card, index) => (
                    <div key={index}>
                        <div>{card.title}</div>
                        <div>{card.subTitle}</div>
                        {card.modules.map((module, idx) => (
                            <div key={idx}>
                                <span>{module.text}</span>
                                <span>{module.href}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>,
        );

        expect(getByText("/hospidashboard")).toBeInTheDocument();
    });

    test("renders psCards correctly", () => {
        const { getByText } = render(
            <div>
                {psCards.map((card, index) => (
                    <div key={index}>
                        <div>{card.title}</div>
                        <div>{card.subTitle}</div>
                        {card.modules.map((module, idx) => (
                            <div key={idx}>
                                <span>{module.text}</span>
                                <span>{module.href}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>,
        );

        expect(getByText("Gérer mon profil")).toBeInTheDocument();
        expect(getByText("Espace Demandes")).toBeInTheDocument();
        expect(getByText("https://dev-espace-ps.viamedis.fr/#/demandes")).toBeInTheDocument();
    });
});
