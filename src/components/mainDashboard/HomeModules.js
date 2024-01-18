import React from "lib_ui/react";
import { icons } from "shared_lib_ui/assets";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";

const { ContentDocument, SearchNormal, AddIcon, HomeIcon, ROCIcon, PaymentIcon, PSIcon, ThirdPartyPaymentIcon, User, MoneyArchive, MoneyCardEdit } = icons;

export const gestionnerCards = [
    {
        Header: ROCIcon,
        modules: [
            {
                code: ["ROC", "HFAC"],
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/hospidashboard",
            },
            {
                code: ["ROC"],
                text: "Rechercher des services ROC",
                Icon: SearchNormal,
                href: "/serviceEnLigne",
            },
            {
                code: ["HFAC"],
                text: "Rechercher des factures",
                Icon: SearchNormal,
                href: "/factures",
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
                code: ["TPAMC", "TPS"],
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/tpsdashboard",
            },
            {
                code: ["TPAMC"],
                text: "Rechercher des services TP-AMC",
                Icon: SearchNormal,
                href: "/tpAmcServiceEnLigne",
            },
            {
                text: "Rechercher des factures",
                code: ["TPS"],
                Icon: SearchNormal,
                href: "/tpsFactures",
            },
            {
                text: "Créer une facture",
                code: ["TPS"],
                Icon: AddIcon,
                href: "/tpsFactures/create",
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
                code: ["PAI"],
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/paiementdashboard",
            },
            {
                code: ["PAI"],
                text: "Rechercher des paiements",
                Icon: SearchNormal,
                href: "/paiement",
            },
            {
                code: ["PAI"],
                text: "Rechercher des virements",
                Icon: SearchNormal,
                href: "/virements",
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
                code: ["INDU"],
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/indusdashboard",
            },
            {
                code: ["INDU"],
                text: "Rechercher des indus",
                Icon: SearchNormal,
                href: "/indus",
            },
            {
                code: ["INDU"],
                text: "Créer un indu",
                Icon: AddIcon,
                href: "/indus/create",
            },
            {
                code: ["INDU"],
                text: "Rechercher des remboursements",
                Icon: SearchNormal,
                href: "/remboursements",
            },
            {
                code: ["INDU"],
                text: "Créer un remboursement",
                Icon: AddIcon,
                href: "/remboursements/create",
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
                code: ["DRB"],
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/benefdashboard",
            },
            {
                code: ["DRB"],
                text: "Rechercher des droits bénéficiaire",
                Icon: SearchNormal,
                href: "/beneficiaire",
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
                code: ["PS"],
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/psdashboard",
            },
            {
                code: ["PS"],
                text: "Rechercher un professionnel de santé",
                Icon: SearchNormal,
                href: "/ps",
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
                code: ["FIN"],
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/intraitablesdashboard",
            },
            {
                code: ["FIN"],
                text: "Rechercher des factures intraitables",
                Icon: SearchNormal,
                href: "/intraitables",
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
                code: ["HFAC", "ROC"],
                text: "Accueil",
                Icon: SearchNormal,
                href: "/hospidashboard",
            },
            {
                code: ["ROC"],
                text: "Rechercher des services ROC",
                Icon: SearchNormal,
                href: "/serviceEnLigne",
            },
            {
                code: ["HFAC"],
                text: "Rechercher des factures",
                Icon: SearchNormal,
                href: "/factures",
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
                code: ["TPAMC", "TPS"],
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/tpsdashboard",
            },
            {
                code: ["TPAMC"],
                text: "Rechercher des services TP-AMC",
                Icon: SearchNormal,
                href: "/tpAmcServiceEnLigne",
            },
            {
                code: ["TPS"],
                text: "Rechercher des factures",
                Icon: SearchNormal,
                href: "/tpsFactures",
            },
            {
                code: ["TPS"],
                text: "Créer une facture",
                Icon: AddIcon,
                href: "/tpsFactures/create",
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
                code: ["DRB"],
                text: "Accueil",
                Icon: DashboardCustomizeOutlinedIcon,
                href: "/benefdashboard",
            },
            {
                code: ["DRB"],
                text: "Rechercher des droits bénéficiaire",
                Icon: SearchNormal,
                href: "/beneficiaire",
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
                code: ["PS"],
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
                code: ["PS"],
                text: "Rechercher",
                Icon: SearchNormal,
                href: "https://dev-espace-ps.viamedis.fr/#/demandes",
                internal: false,
            },
        ],
        service: "",
        subTitle: "Créer et suivre mes demandes.",
    },
];
