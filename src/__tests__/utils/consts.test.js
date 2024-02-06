const { MODULES } = require("../../utils/consts");

it("should return the correct consts", () => {
    expect(MODULES).toEqual(["HFAC", "ROC", "TPS", "TPAMC", "FIN", "DRB", "PAI", "INDU", "PS"]);
});
