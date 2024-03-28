const { userProfleSM } = require("../../utils/userProfleSM");

it("should return the expected result when role and entity are valid", () => {
    const role = "CLAIM_DEPENDENT";
    const entity = "Dashboard";
    const props = {
        cards: [
            {
                id: 1,
                name: "Card 1",
                modules: [
                    { code: "module1", claim: ["claim1", "claim2"], disabled: false },
                    { code: "module2", claim: ["claim3"] },
                ],
            },
            {
                id: 2,
                name: "Card 2",
                modules: [
                    { code: "module3", claim: ["claim4"] },
                    { code: "module4", claim: ["claim5"] },
                ],
            },
        ],
        baseClaims: ["claim1", "claim3", "claim5","module2"],
        moduleClaims: {
            module1: { claims: ["claim1", "claim2"] },
            module2: { claims: ["claim3"] },
            module3: { claims: ["claim4"] },
            module4: { claims: ["claim5"] },
        },
    };



    const result = userProfleSM({ entity, role, props });

    expect(result).toEqual([{ "id": 1, "modules": [{ "claim": ["claim1", "claim2"], "code": "module1", "disabled": false }, { "claim": ["claim3"], "code": "module2",  }], "name": "Card 1" }]);
});
it("should return the expected result when role and entity are valid disabled", () => {
    const role = "CLAIM_DEPENDENT";
    const entity = "Dashboard";
    const props = {
        cards: [
            {
                id: 1,
                name: "Card 1",
                modules: [
                    { code: "module1", claim: ["claim1", "claim2"], disabled: false },
                ],
            },
        ],
        baseClaims: ["module1"],
        moduleClaims: {
            module1: { claims: ["claim1", "claim2"] },
        },
    };



    const result = userProfleSM({ entity, role, props });

    expect(result).toEqual([{ "id": 1, "modules": [{ "claim": ["claim1", "claim2"], "code": "module1", "disabled": false }], "name": "Card 1" }]);
});``

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
        expect(result).toBeNull();
    });
});

describe("userProfleSM with GESTIONAIRE", () => {
    it("should return the correct result based on the entity and role", () => {
        const entity = "Dashboard";
        const role = "GESTIONAIRE";
        const props = { gestionnerCards: [], claims: [] };
        const result = userProfleSM({ entity, role, props });
        expect(result).toBeNull();
    });
});
