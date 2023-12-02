import React from "lib_ui/react";
import {useSelector} from "lib_ui/react-redux";
import {Dashboard} from "shared_lib_ui/Lib/layout";
import { LoadingDots } from "shared_lib_ui/Lib/components";
import {getUser} from "shared_lib_ui/host";
import {userProfleSM} from "../utils/userProfleSM";
import {icons} from "shared_lib_ui/assets";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
export default function Home() {
	
	const {
		ContentDocument,
		SearchNormal,
		AddIcon,
		HomeIcon,
		ROCIcon,
		PaymentIcon,
		PSIcon,
		ThirdPartyPaymentIcon,
		User,
		MoneyArchive,
		MoneyCardEdit,
	} = icons;
	const title = "Bienvenue dans votre espace";
	const subTitlePS = "Professionnel de santé";
	const subTitleUser = "cher utilisateur";
	
	const user = useSelector(getUser);

	let role =  null
	if (user?.idTokenClaims) role = user?.idTokenClaims?.extension_finess ? "PS" : "GESTIONAIRE"
	
	const gestionnerCards = [
		{
			Header: ROCIcon,
			modules: [
				{text: "Services en ligne ROC", Icon: SearchNormal, href: "/serviceEnLigne"},
				{text: "Factures", Icon: SearchNormal, href: "/factures"}
			],
			title: 'Hospitalisation',
			service: '', subTitle: '',
		},
		
		{
			Header: ThirdPartyPaymentIcon,
			modules: [
				{text: "tableau de TP bord", Icon: DashboardCustomizeOutlinedIcon, href: "/tpsdashboard"},
				{text: "Tiers payant simple", Icon: SearchNormal, href: "/tpAmcServiceEnLigne"},
				{text: "Créer une facture TPS", Icon: AddIcon, href: "/tpsFactures/create" },
				{text: "Services en ligne ROC", Icon: SearchNormal, href: "/tpAmcServiceEnLigne"}
			],
			title: 'Tiers payant',
			service: '', subTitle: ''
		},
		
		{
			Header: PaymentIcon,
			modules: [
				{text: "Paiement", Icon: DashboardCustomizeOutlinedIcon, href: "/paiementdashboard"},
			],
			title: 'Paiement & Virement',
			service: '', subTitle: '',
		},
		
		{
			Header: MoneyCardEdit,
			modules: [
				{text: "Indus and Remboursements", Icon: DashboardCustomizeOutlinedIcon, href: "/indusdashboard"},
				{text: "Indus", Icon: SearchNormal, href: "/indus"},
				{text: "Créer une Indu", Icon: AddIcon, href: "/indus/create"},
			],
			title: 'Indu',
			service: '', subTitle: '',
		},
		
		{
			Header: ContentDocument,
			modules: [
				{text: "tableau de bord",
					Icon: DashboardCustomizeOutlinedIcon, href: "/benefdashboard"},
				{text: "Rechercher", Icon: SearchNormal, href: "/beneficiaire"},
			],
			title: "Droits bénéficiaires",
			service: "",
			subTitle: "Consulter les droits sur mes disciplines.",
		},
		
		{
			Header: PSIcon,
			modules: [
				{text: "Professionnel de santé", Icon: DashboardCustomizeOutlinedIcon, href: "/psdashboard"},
			],
			title: 'Professionnel de santé',
			service: '', subTitle: '',
		},
		
		{
			Header: MoneyArchive,
			modules: [
				{text: "Factures intraitable", Icon: DashboardCustomizeOutlinedIcon, href: "/intraitablesdashboard"},
			],
			title: 'Factures intraitables',
			service: '', subTitle: '',
		},
	
	];
	
	
	const psCards = [
		{
			Header: ContentDocument,
			modules: [
				{text: "tableau de TP bord", Icon: DashboardCustomizeOutlinedIcon, href: "/tpsdashboard"},
				{text: "Rechercher factures TPS", Icon: SearchNormal, href: "/tpsFactures"},
				{text: "Créer une facture TPS", Icon: AddIcon, href: "/tpsFactures/create"},
				{text: "tableau de ROC bord", Icon: DashboardCustomizeOutlinedIcon, href: "/hospidashboard"},
				{text: "Rechercher factures Hospi", Icon: SearchNormal, href: "/factures"},
			],
			title: "Mes factures",
			service: "",
			subTitle: "Accéder aux factures et suivre leur déroulement.",
		},
		{
			Header: ContentDocument,
			modules: [
				{text: "Rechercher", Icon: SearchNormal, href: "/beneficiaire"},
			],
			title: "Droits bénéficiaires",
			service: "",
			subTitle: "Consulter les droits sur mes disciplines.",
		},
		{
			Header: ContentDocument,
			modules: [
				{text: "Rechercher", Icon: SearchNormal, href: "/profile"},
			],
			title: "Mon profil",
			service: "",
			subTitle: "Consulter les droits sur mes informations.",
		},
		{
			Header: ContentDocument,
			title: "Espace Demandes",
			service: "",
			subTitle: "Créer et suivre mes demandes.",
		},
	];
	
	return (<>
		{!role && <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
			<LoadingDots />
		</div>}
		<Dashboard
		title={title}
		subTitle={userProfleSM({entity: 'subTitle', role, props: {subTitlePS, subTitleUser}})}
		cards={userProfleSM({entity: 'Dashboard', role, props: {psCards, gestionnerCards}})}
	/></>);
	
}
