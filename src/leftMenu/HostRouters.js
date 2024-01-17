import { icons } from "shared_lib_ui/assets";
import { MODULES } from "../utils/consts";
const { HomeIcon, ROCIcon, PaymentIcon, PSIcon, ThirdPartyPaymentIcon, User, MoneyArchive, MoneyCardEdit, UserThermsAndCondition } = icons;

const psRouters = [
    {
        code: MODULES,
        name: "Accueil",
        icon: HomeIcon,
        path: "/",
        children: [],
    },
    {
        code: ["HFAC", "ROC"],
        name: "Factures",
        icon: ROCIcon,
        path: "/factures",
        children: [],
    },
    {
        code: ["ROC"],
        name: "Services en ligne ROC",
        icon: ROCIcon,
        path: "/serviceEnLigne",
        children: [],
    },
    {
        code: ["TPS", "TPAMC"],
        name: "Tiers payant simple",
        icon: ThirdPartyPaymentIcon,
        path: "/tpsdashboard",
        children: [
            { name: "TpAmcEnLigne", path: "/tpAmcServiceEnLigne" },
            { name: "Factures", path: "/tpsFactures" },
        ],
    },
    {
        code: ["PAI"],
        name: "Paiement",
        icon: PaymentIcon,
        path: "/paiementdashboard",
        children: [
            { name: "Paiement", path: "/paiement" },
            { name: "Virement", path: "/virements" },
        ],
    },

    {
        code: ["DRB"],
        name: "Bénéficiaire",
        icon: User,
        path: "/beneficiaire",
        children: [],
    },

    {
        code: MODULES,
        icon: UserThermsAndCondition,
        path: "/terms",
        children: [{ path: "/terms/terms-of-service" }, { path: "/terms/legal-notice" }, { path: "/terms/personal-data-protection-policy" }],
    },
];
const gestionnerRouters = [
    {
        code: MODULES,
        name: "Accueil",
        icon: HomeIcon,
        path: "/",
        children: [],
    },
    {
        code: ["HFAC", "ROC"],
        name: "Hospitalisation",
        icon: ROCIcon,
        path: "/hospidashboard",
        children: [
            { name: "Services en ligne ROC", path: "/serviceEnLigne" },
            { name: "Factures", path: "/factures" },
        ],
    },
    {
        code: ["TPS", "TPAMC"],
        name: "Tiers payant simple",
        icon: ThirdPartyPaymentIcon,
        path: "/tpsdashboard",
        children: [
            { name: "TpAmcEnLigne", path: "/tpAmcServiceEnLigne" },
            { name: "Factures", path: "/tpsFactures" },
        ],
    },
    {
        code: ["PAI"],
        name: "Paiement",
        icon: PaymentIcon,
        path: "/paiementdashboard",
        children: [
            { name: "Paiement", path: "/paiement" },
            { name: "Virement", path: "/virements" },
        ],
    },
    {
        code: ["INDU"],
        name: "Indu",
        icon: MoneyCardEdit,
        path: "/indusdashboard",
        children: [
            { name: "Indus", path: "/indus" },
            { name: "Remboursements", path: "/remboursements" },
        ],
    },
    {
        code: ["DRB"],
        name: "Bénéficiaire",
        icon: User,
        path: "/benefdashboard",
        children: [],
    },
    {
        code: ["PS"],
        name: "Professionnel de santé",
        icon: PSIcon,
        path: "/psdashboard",
        children: [
            { name: "Professionnel de santé", path: "/ps" },
            { name: "Système de gestion des utilisateurs", path: "/ps/auth" },
            { name: "Système de gestion des utilisateurs", path: "/profile" },
            { name: "Système de gestion des utilisateurs", path: "/user" },
        ],
    },
    {
        icon: UserThermsAndCondition,
        code: MODULES,
        path: "/terms",
        children: [{ path: "/terms/terms-of-service" }, { path: "/terms/legal-notice" }, { path: "/terms/personal-data-protection-policy" }],
    },
    {
        code: ["FIN"],
        name: "Factures intraitables",
        icon: MoneyArchive,
        path: "/intraitablesdashboard",
        children: [{ name: "Factures intraitable", path: "/intraitables" }],
    },
];

export { psRouters, gestionnerRouters };
