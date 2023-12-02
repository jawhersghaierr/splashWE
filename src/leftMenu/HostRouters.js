
import { icons } from "shared_lib_ui/assets";
const {
    HomeIcon,
    ROCIcon,
    PaymentIcon,
    PSIcon,
    ThirdPartyPaymentIcon,
    User,
    MoneyArchive,
    MoneyCardEdit,
    UserThermsAndCondition
} = icons;

const psRouters = [
    {
        name: "Accueil",
        icon: HomeIcon,
        path: "/",
        children: [] ,
    },
    {
        name: "Factures",
        icon: ROCIcon,
        path: "/factures",
        children: [],
    },    {
        name: "Services en ligne ROC",
        icon: ROCIcon,
        path: "/serviceEnLigne",
        children: [],
    },
    {
        name: "Tiers payant simple",
        icon: ThirdPartyPaymentIcon,
        path: "/tpsdashboard",
        children: [
            { name: "TpAmcEnLigne", path: "/tpAmcServiceEnLigne" },
            { name: "Factures", path: "/tpsFactures" },
        ],
    },
    {
        name: "Paiement",
        icon: PaymentIcon,
        path: "/paiementdashboard",
        children: [
            { name: "Paiement", path: "/paiement" },
            { name: "Virement", path: "/virements" },
        ],
    },

    {
        name: "Bénéficiaire",
        icon: User,
        path: "/beneficiaire",
        children: [],
    },

    {
        icon: UserThermsAndCondition,
        path: "/terms",
        children: [
            { path: "/terms/terms-of-service", },
            { path: "/terms/legal-notice", },
            { path: "/terms/personal-data-protection-policy", }
        ] ,
    },

];
const gestionnerRouters = [
    {
        name: "Accueil",
        icon: HomeIcon,
        path: "/",
        children: [] ,
    },
    {
        name: "Hospitalisation",
        icon: ROCIcon,
        path: "/hospidashboard",
        children: [
            { name: "Services en ligne ROC", path: "/serviceEnLigne" },
            { name: "Factures", path: "/factures" },
        ],
    },
    {
        name: "Tiers payant simple",
        icon: ThirdPartyPaymentIcon,
        path: "/tpsdashboard",
        children: [
            { name: "TpAmcEnLigne", path: "/tpAmcServiceEnLigne" },
            { name: "Factures", path: "/tpsFactures" },
        ],
    },
    {
        name: "Paiement",
        icon: PaymentIcon,
        path: "/paiementdashboard",
        children: [
            { name: "Paiement", path: "/paiement" },
            { name: "Virement", path: "/virements" },
        ],
    },
    {
        name: "Indu",
        icon: MoneyCardEdit,
        path: "/indusdashboard",
        children: [
            { name: "Indus", path: "/indus" },
            { name: "Remboursements", path: "/remboursements" },
        ],
    },
    {
        name: "Bénéficiaire",
        icon: User,
        path: "/benefdashboard",
        children: [],
    },
    {
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
        path: "/terms",
        children: [
            { path: "/terms/terms-of-service", },
            { path: "/terms/legal-notice", },
            { path: "/terms/personal-data-protection-policy", }
        ] ,
    },
    {
        name: "Factures intraitables",
        icon: MoneyArchive,
        path: "/intraitablesdashboard",
        children: [
            { name: "Factures intraitable", path: "/intraitables" },
        ],
    },

];



export {psRouters, gestionnerRouters};
