import React from "lib_ui/react";
import { useSelector } from "lib_ui/react-redux";
import { Dashboard } from "shared_lib_ui/Lib/layout";
import { LoadingDots } from "shared_lib_ui/Lib/components";
import { userProfleSM } from "../../utils/userProfleSM";
import { isPS, isAuthenticated, getBaseClaims } from "shared_lib_ui/host";
import { gestionnerCards, psCards } from "./HomeModules";

export default function Home() {
    const title = "Bienvenue dans votre espace";
    const subTitlePS = "Professionnel de santé";
    const subTitleUser = "tiers payant";
    const isPsUser = useSelector(isPS);
    const isLogged = useSelector(isAuthenticated);
    const baseClaims = useSelector(getBaseClaims);

    let role = null;
    if (isLogged) role = isPsUser ? "PS" : "GESTIONAIRE";

    return (
        <>
            {!role && (
                <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <LoadingDots />
                </div>
            )}
            <Dashboard
                title={title}
                subTitle={userProfleSM({
                    entity: "subTitle",
                    role,
                    props: {
                        subTitlePS,
                        subTitleUser,
                        claims: baseClaims,
                    },
                })}
                cards={userProfleSM({
                    entity: "Dashboard",
                    role,
                    props: {
                        psCards,
                        gestionnerCards,
                        claims: baseClaims,
                    },
                })}
            />
        </>
    );
}
