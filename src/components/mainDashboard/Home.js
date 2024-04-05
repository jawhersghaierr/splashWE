import React from "react";
import { useSelector } from "react-redux";
import { Dashboard } from "shared_lib_ui/Lib/layout";
import { LoadingDots } from "shared_lib_ui/Lib/components";
import { userProfileSM } from "../../utils/userProfileSM";
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

    let context = null;
    if (isLogged) context = isPsUser ? "PS" : "GESTIONAIRE";

    return (
        <>
            {!context && (
                <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <LoadingDots />
                </div>
            )}
            <Dashboard
                title={title}
                subTitle={userProfileSM({
                    entity: "subTitle",
                    context,
                    props: {
                        subTitlePS,
                        subTitleUser,
                        claims: baseClaims,
                    },
                })}
                cards={userProfileSM({
                    entity: "Dashboard",
                    context: "CLAIM_DEPENDENT",
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
