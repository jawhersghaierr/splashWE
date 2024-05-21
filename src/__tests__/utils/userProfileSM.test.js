import { userProfileSM, profileRoleState } from "../../utils/userProfileSM";
import { userProfileSmAndCommonClaims } from "shared_lib_ui/auth";

jest.mock(
    "shared_lib_ui/auth",
    () => ({
        userProfileSmAndCommonClaims: {
            commonUserProfileSM: jest.fn(),
            CLAIM_DEPENDENT: jest.fn(() => {}),
        },
    }),
    { virtual: true },
);

describe("userProfileSM", () => {
    it("should be defined", () => {
        expect(userProfileSM).toBeDefined();
    });

    it("called commonUserProfileSM", () => {
        userProfileSmAndCommonClaims.commonUserProfileSM.mockImplementation(() => {
            return jest.fn();
        });

        userProfileSM({ entity: "entity", context: "context", props: "props" });
        expect(userProfileSmAndCommonClaims.commonUserProfileSM).toHaveBeenCalled();
    });

    it("SubTitle PS", () => {
        expect(profileRoleState["PS"].subTitle({ subTitlePS: "subTitle" })).toEqual("subTitle");
    });

    it("LeftMenu PS", () => {
        const routers = [
            { name: "Router 1", code: "CLAIM 1" },
            { name: "Router 2", code: "CLAIM 2" },
        ];
        expect(profileRoleState["PS"].LeftMenu({ psRouters: routers, claims: ["CLAIM 2"] })).toEqual([{ name: "Router 2", code: "CLAIM 2" }]);
    });

    it("SubTitle GESTIONAIRE", () => {
        expect(profileRoleState["GESTIONAIRE"].subTitle({ subTitleUser: "subTitle" })).toEqual("subTitle");
    });

    it("LeftMenu GESTIONAIRE", () => {
        const routers = [
            { name: "Router 1", code: "CLAIM 1" },
            { name: "Router 2", code: "CLAIM 2" },
        ];
        expect(profileRoleState["GESTIONAIRE"].LeftMenu({ gestionnerRouters: routers, claims: ["CLAIM 2"] })).toEqual([{ name: "Router 2", code: "CLAIM 2" }]);
    });
});
