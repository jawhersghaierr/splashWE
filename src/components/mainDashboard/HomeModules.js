import { icons } from "shared_lib_ui/assets";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";

const { ContentDocument, SearchNormal, AddIcon, HomeIcon, ROCIcon, PaymentIcon, PSIcon, ThirdPartyPaymentIcon, User, MoneyArchive, MoneyCardEdit } = icons;

export const gestionnerCards = [
    {
        Header: ROCIcon,
        modules: [
            {
                code: "HFAC",
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/hospidashboard",
            },
            {
                code: "ROC",
                text: "Rechercher des services ROC",
                Icon: SearchNormal,
                href: "/serviceEnLigne",
                claim: ["CAN_SEARCH_SEL"],
                disabled: false,
            },
            {
                code: "HFAC",
                text: "Rechercher des factures",
                Icon: SearchNormal,
                href: "/factures",
                claim: ["CAN_SEARCH_FACTURE"],
                disabled: false,
            },
        ],
        title: "Hospitalisation",
        service: "",
        subTitle: "",
    },

    {
        Header: ThirdPartyPaymentIcon,
        modules: [
            {
                code: "TPS",
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/tpsdashboard",
            },
            {
                code: "TPAMC",
                text: "Rechercher des services TP-AMC",
                Icon: SearchNormal,
                href: "/tpAmcServiceEnLigne",
                claim: ["CAN_SEARCH_SEL"],
                disabled: false,
            },
            {
                text: "Rechercher des factures",
                code: "TPS",
                Icon: SearchNormal,
                href: "/tpsFactures",
                claim: ["CAN_SEARCH_FACTURE"],
                disabled: false,
            },
            {
                text: "Créer une facture",
                code: "TPS",
                Icon: AddIcon,
                href: "/tpsFactures/create",
                claim: ["CAN_CREATE_MANUAL_FACTURE"],
                disabled: false,
            },
        ],
        title: "Tiers payant simple",
        service: "",
        subTitle: "",
    },

    {
        Header: PaymentIcon,
        modules: [
            {
                code: "PAI",
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/paiementdashboard",
            },
            {
                code: "PAI",
                text: "Rechercher des paiements",
                Icon: SearchNormal,
                href: "/paiement",
                claim: ["CAN_SEARCH_PAIEMENT"],
                disabled: false,
            },
            {
                code: "PAI",
                text: "Rechercher des virements",
                Icon: SearchNormal,
                href: "/virements",
                claim: ["CAN_SEARCH_VIREMENT"],
                disabled: false,
            },
        ],
        title: "Paiement",
        service: "",
        subTitle: "",
    },

    {
        Header: MoneyCardEdit,
        modules: [
            {
                code: "INDU",
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/indusdashboard",
            },
            {
                code: "INDU",
                text: "Rechercher des indus",
                Icon: SearchNormal,
                href: "/indus",
                claim: ["CAN_SEARCH_INDU"],
                disabled: false,
            },
            {
                code: "INDU",
                text: "Créer un indu",
                Icon: AddIcon,
                href: "/indus/create",
                claim: ["CAN_CREATE_INDU"],
                disabled: false,
            },
            {
                code: "INDU",
                text: "Rechercher des remboursements",
                Icon: SearchNormal,
                href: "/remboursements",
                claim: ["CAN_SEARCH_REMBOURSEMENT"],
                disabled: false,
            },
            {
                code: "INDU",
                text: "Créer un remboursement",
                Icon: AddIcon,
                href: "/remboursements/create",
                claim: ["CAN_CREATE_REMBOURSEMENT"],
                disabled: false,
            },
        ],
        title: "Indu",
        service: "",
        subTitle: "",
    },

    {
        Header: User,
        modules: [
            {
                code: "DRB",
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/benefdashboard",
            },
            {
                code: "DRB",
                text: "Rechercher des droits bénéficiaire",
                Icon: SearchNormal,
                href: "/beneficiaire",
                claim: ["CAN_SEARCH_DRB"],
                disabled: false,
            },
        ],
        title: "Bénéficiaire",
        service: "",
        subTitle: "",
    },

    {
        Header: PSIcon,
        modules: [
            {
                code: "PS",
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/psdashboard",
            },
            {
                code: "PS",
                text: "Rechercher un professionnel de santé",
                Icon: SearchNormal,
                href: "/ps",
                claim: ["CAN_SEARCH_ETS_PS"],
                disabled: false,
            },
        ],
        title: "Professionnel de santé",
        service: "",
        subTitle: "",
    },

    {
        Header: MoneyArchive,
        modules: [
            {
                code: "FIN",
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/intraitablesdashboard",
            },
            {
                code: "FIN",
                text: "Rechercher des factures intraitables",
                Icon: SearchNormal,
                href: "/intraitables",
                claim: ["CAN_SEARCH_FILE_UNTREATABLE_FACTURE"],
                disabled: false,
            },
        ],
        title: "Factures intraitables",
        service: "",
        subTitle: "",
    },
];

export const psCards = [
    {
        Header: ROCIcon,
        modules: [
            {
                code: "HFAC",
                text: "Accueil",
                Icon: SearchNormal,
                href: "/hospidashboard",
            },
            {
                code: "ROC",
                text: "Rechercher des services ROC",
                Icon: SearchNormal,
                href: "/serviceEnLigne",
                claim: ["CAN_SEARCH_SEL"],
                disabled: false,
            },
            {
                code: "HFAC",
                text: "Rechercher des factures",
                Icon: SearchNormal,
                href: "/factures",
                claim: ["CAN_SEARCH_FACTURE"],
                disabled: false,
            },
        ],
        title: "Hospitalisation",
        service: "",
        subTitle: "",
    },

    {
        Header: ThirdPartyPaymentIcon,
        modules: [
            {
                code: "TPS",
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/tpsdashboard",
            },
            {
                code: "TPAMC",
                text: "Rechercher des services TP-AMC",
                Icon: SearchNormal,
                href: "/tpAmcServiceEnLigne",
                claim: ["CAN_SEARCH_SEL"],
                disabled: false,
            },
            {
                code: "TPS",
                text: "Rechercher des factures",
                Icon: SearchNormal,
                href: "/tpsFactures",
                claim: ["CAN_SEARCH_FACTURE"],
                disabled: false,
            },
            {
                code: "TPS",
                text: "Créer une facture",
                Icon: AddIcon,
                href: "/tpsFactures/create",
                claim: ["CAN_CREATE_MANUAL_FACTURE"],
                disabled: false,
            },
        ],
        title: "Tiers payant simple",
        service: "",
        subTitle: "",
    },

    {
        Header: ContentDocument,
        modules: [
            {
                code: "DRB",
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/benefdashboard",
            },
            {
                code: "DRB",
                text: "Rechercher des droits bénéficiaire",
                Icon: SearchNormal,
                href: "/beneficiaire",
                claim: ["CAN_PSSEARCH_DRB"],
                disabled: false,
            },
        ],
        title: "Bénéficiaire",
        service: "",
        subTitle: "",
    },

    {
        Header: ContentDocument,
        modules: [
            {
                code: "PS",
                text: "Gérer mon profil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/ps/profile",
                disabled: false,
            },
        ],
        title: "Mon profil",
        service: "",
        subTitle: "Consulter et gérer mes informations.",
    },
    {
        Header: ContentDocument,
        title: "Espace Demandes",
        modules: [
            {
                code: "PS",
                text: "Rechercher",
                Icon: SearchNormal,
                href: "https://dev-espace-ps.viamedis.fr/#/demandes",
                internal: false,
                claim: ["CAN_GET_ETS_PS_DETAILS"],
                disabled: false,
            },
        ],
        service: "",
        subTitle: "Créer et suivre mes demandes.",
    },
];
