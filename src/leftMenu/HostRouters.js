import { icons } from "shared_lib_ui/assets";
const { HomeIcon, ROCIcon, PaymentIcon, PSIcon, ThirdPartyPaymentIcon, User, MoneyArchive, MoneyCardEdit, UserThermsAndCondition } = icons;

const psRouters = [
    {
        name: "Accueil",
        code: "ALL",
        icon: HomeIcon,
        path: "/",
        children: [],
    },
    {
        name: "Factures",
        code: "HFAC",
        icon: ROCIcon,
        path: "/factures",
        children: [],
    },
    {
        name: "Services en ligne ROC",
        code: "ROC",
        icon: ROCIcon,
        path: "/serviceEnLigne",
        children: [],
    },
    {
        name: "Tiers payant simple",
        code: "TPS",
        icon: ThirdPartyPaymentIcon,
        path: "/tpsdashboard",
        children: [
            { name: "TpAmcEnLigne", path: "/tpAmcServiceEnLigne" },
            { name: "Factures", path: "/tpsFactures" },
        ],
    },
    {
        name: "Paiement",
        code: "PAI",
        icon: PaymentIcon,
        path: "/paiementdashboard",
        children: [
            { name: "Paiement", path: "/paiement" },
            { name: "Virement", path: "/virements" },
        ],
    },

    {
        name: "Bénéficiaire",
        code: "DRB",
        icon: User,
        path: "/beneficiaire",
        children: [],
    },

    {
        icon: UserThermsAndCondition,
        code: "ALL",
        path: "/terms",
        children: [{ path: "/terms/terms-of-service" }, { path: "/terms/legal-notice" }, { path: "/terms/personal-data-protection-policy" }],
    },
];
const gestionnerRouters = [
    {
        name: "Accueil",
        code: "ALL",
        icon: HomeIcon,
        path: "/",
        children: [],
    },
    {
        name: "Hospitalisation",
        code: "HFAC",
        icon: ROCIcon,
        path: "/hospidashboard",
        children: [
            { name: "Services en ligne ROC", path: "/serviceEnLigne" },
            { name: "Factures", path: "/factures" },
        ],
    },
    {
        name: "Tiers payant simple",
        code: "TPS",
        icon: ThirdPartyPaymentIcon,
        path: "/tpsdashboard",
        children: [
            { name: "TpAmcEnLigne", path: "/tpAmcServiceEnLigne" },
            { name: "Factures", path: "/tpsFactures" },
        ],
    },
    {
        name: "Paiement",
        code: "PAI",
        icon: PaymentIcon,
        path: "/paiementdashboard",
        children: [
            { name: "Paiement", path: "/paiement" },
            { name: "Virement", path: "/virements" },
        ],
    },
    {
        name: "Indu",
        code: "INDU",
        icon: MoneyCardEdit,
        path: "/indusdashboard",
        children: [
            { name: "Indus", path: "/indus" },
            { name: "Remboursements", path: "/remboursements" },
        ],
    },
    {
        name: "Bénéficiaire",
        code: "DRB",
        icon: User,
        path: "/benefdashboard",
        children: [],
    },
    {
        name: "Professionnel de santé",
        code: "PS",
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
        code: "ALL",
        path: "/terms",
        children: [{ path: "/terms/terms-of-service" }, { path: "/terms/legal-notice" }, { path: "/terms/personal-data-protection-policy" }],
    },
    {
        name: "Factures intraitables",
        code: "FIN",
        icon: MoneyArchive,
        path: "/intraitablesdashboard",
        children: [{ name: "Factures intraitable", path: "/intraitables" }],
    },
];

export { psRouters, gestionnerRouters };
