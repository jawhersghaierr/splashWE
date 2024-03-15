import React from "react";
import { useSelector } from "react-redux";
import { Dashboard } from "shared_lib_ui/Lib/layout";
import { LoadingDots } from "shared_lib_ui/Lib/components";
import { userProfleSM } from "../../utils/userProfleSM";
import { isPS, isAuthenticated, getBaseClaims, getClaims } from "shared_lib_ui/host";
import { gestionnerCards, psCards } from "./HomeModules";

export default function Home() {
    const title = "Bienvenue dans votre espace";
    const subTitlePS = "Professionnel de santé";
    const subTitleUser = "tiers payant";
    const isPsUser = useSelector(isPS);
    const isLogged = useSelector(isAuthenticated);
    const baseClaims = useSelector(getBaseClaims);
    const moduleClaims = useSelector(getClaims);

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
                    role: "CLAIM_DEPENDENT",
                    props: {
                        cards: isPsUser ? psCards : gestionnerCards,
                        baseClaims: baseClaims,
                        moduleClaims: moduleClaims,
                    },
                })}
            />
        </>
    );
}
