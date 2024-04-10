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
});
