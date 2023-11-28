
import { icons } from "shared_lib_ui/assets";
const { HomeIcon, ROCIcon, PaymentIcon, PSIcon, ThirdPartyPaymentIcon, User, MoneyArchive, MoneyCardEdit, UserThermsAndCondition } = icons;

const HostRouters = [
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
        children: [],
    },
    {
        name: "Tiers payant simple",
        icon: ThirdPartyPaymentIcon,
        path: "/tpsdashboard",
        children: [],
    },
    {
        name: "Paiement",
        icon: PaymentIcon,
        path: "/paiementdashboard",
        children: [],
    },
    {
        name: "Indu",
        icon: MoneyCardEdit,
        path: "/indusdashboard",
        children: [],
    },
    {
        name: "Bénéficiaire",
        icon: User,
        path: "/beneficiaire",
        children: [],
    },
    {
        name: "Professionnel de santé",
        icon: PSIcon,
        path: "/psdashboard",
        children: [],
    },
    {
        name: "Factures intraitables",
        icon: MoneyArchive,
        path: "/intraitablesdashboard",
        children: [],
    },
    {
        icon: UserThermsAndCondition,
        path: "/terms",
        children: [
            {
                path: "/terms/terms-of-service",
            },
            {
                path: "/terms/legal-notice",
            },
            {
                path: "/terms/personal-data-protection-policy",
            }
        ] ,
    },
];

 

export default HostRouters;
