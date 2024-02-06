const { userProfleSM } = require("../../utils/userProfleSM");

it("should return the correct result for Dashboard entity with valid claims", () => {
    const cards = [
        {
            Header: "ContentDocument",
            modules: [
                {
                    text: "Rechercher",
                    Icon: "SearchNormal",
                    href: "/paiement",
                    code: ["HFAC", "ROC"],
                    disabled: false,
                },
            ],
            title: "Paiement",
            service: "",
            subTitle: "Recherchez un paiement",
        },
        {
            Header: "ContentDocument",
            modules: [
                {
                    text: "Rechercher",
                    Icon: "SearchNormal",
                    href: "/paiement",
                    code: ["HFAC"],
                    disabled: false,
                },
            ],
            title: "Paiement",
            service: "",
            subTitle: "Recherchez un paiement",
        },
    ];

    const claims = ["ROC"];

    const props = { psCards: cards, claims };
    const result = userProfleSM({ entity: "Dashboard", role: "PS", props });

    expect(result).toEqual([
        {
            Header: "ContentDocument",
            modules: [{ Icon: "SearchNormal", code: ["HFAC", "ROC"], disabled: false, href: "/paiement", text: "Rechercher" }],
            service: "",
            subTitle: "Recherchez un paiement",
            title: "Paiement",
        },
    ]);
});

it("should return the correct subTitle for PS", () => {
    const subTitlePS = "Subtitle PS";
    const props = { subTitlePS };
    const result = userProfleSM({ entity: "subTitle", role: "PS", props });

    expect(result).toEqual("Subtitle PS");
});

it("should return the correct subTitle for GESTIONAIRE", () => {
    const subTitleUser = "Subtitle GESTIONAIRE";
    const props = { subTitleUser };
    const result = userProfleSM({ entity: "subTitle", role: "GESTIONAIRE", props });

    expect(result).toEqual("Subtitle GESTIONAIRE");
});

it("should return the correct LeftMenu for PS", () => {
    const psRouters = [
        {
            code: ["HFAC", "ROC"],
            name: "Factures",
            icon: "ROCIcon",
            path: "/factures",
            children: [],
        },
        {
            code: ["ROC"],
            name: "Services en ligne ROC",
            icon: "ROCIcon",
            path: "/serviceEnLigne",
            children: [],
        },
    ];
    const claims = ["HFAC"];
    const props = { psRouters, claims };
    const result = userProfleSM({ entity: "LeftMenu", role: "PS", props });

    expect(result).toEqual([
        {
            code: ["HFAC", "ROC"],
            name: "Factures",
            icon: "ROCIcon",
            path: "/factures",
            children: [],
        },
    ]);
});

it("should return the correct LeftMenu for GESTIONAIRE", () => {
    const gestionnerRouters = [
        {
            code: ["HFAC", "ROC"],
            name: "Factures",
            icon: "ROCIcon",
            path: "/factures",
            children: [],
        },
        {
            code: ["ROC"],
            name: "Services en ligne ROC",
            icon: "ROCIcon",
            path: "/serviceEnLigne",
            children: [],
        },
    ];
    const claims = ["HFAC"];
    const props = { gestionnerRouters, claims };
    const result = userProfleSM({ entity: "LeftMenu", role: "GESTIONAIRE", props });

    expect(result).toEqual([
        {
            code: ["HFAC", "ROC"],
            name: "Factures",
            icon: "ROCIcon",
            path: "/factures",
            children: [],
        },
    ]);
});

describe("userProfleSM with PS", () => {
    it("should return the correct result based on the entity and role", () => {
        const entity = "Dashboard";
        const role = "PS";
        const props = { psCards: [], claims: [] };
        const result = userProfleSM({ entity, role, props });
        expect(result).toEqual([]);
    });
});

describe("userProfleSM with GESTIONAIRE", () => {
    it("should return the correct result based on the entity and role", () => {
        const entity = "Dashboard";
        const role = "GESTIONAIRE";
        const props = { gestionnerCards: [], claims: [] };
        const result = userProfleSM({ entity, role, props });
        expect(result).toEqual([]);
    });
});
