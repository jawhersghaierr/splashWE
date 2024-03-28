jest.mock("../bootstrap", () => ({
    index: () => {
        return {};
    },
}));

describe("Test de l'importation du fichier bootstrap.js", () => {
    test("doit importer le fichier bootstrap.js", () => {
        const bootstrap = require("../index.js");
        expect(bootstrap).toBeDefined();
    });
});
