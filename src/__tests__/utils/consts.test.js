const { MODULES } = require("../../utils/consts");

test("should return the correct consts", () => {
    expect(MODULES).toEqual(["HFAC", "ROC", "TPS", "TPAMC", "FIN", "DRB", "PAI", "INDU", "PS"]);
});
