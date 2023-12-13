import React from "lib_ui/react";
import {useSelector} from "lib_ui/react-redux";
import {Dashboard} from "shared_lib_ui/Lib/layout";
import {LoadingDots} from "shared_lib_ui/Lib/components";
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
	
	let role = null
	if (user?.idTokenClaims) role = user?.idTokenClaims?.extension_finess ? "PS" : "GESTIONAIRE"
	
	const gestionnerCards = [
		{
			Header: ROCIcon,
			modules: [
				{text: "Acceuil", Icon: DashboardCustomizeOutlinedIcon, href: "/hospidashboard"},
				{text: "Rechercher des services ROC", Icon: SearchNormal, href: "/serviceEnLigne"},
				{text: "Rechercher des factures", Icon: SearchNormal, href: "/factures"}
			],
			title: 'Hospitalisation',
			service: '', subTitle: '',
		},
		
		{
			Header: ThirdPartyPaymentIcon,
			modules: [
				{text: "Acceuil", Icon: DashboardCustomizeOutlinedIcon, href: "/tpsdashboard"},
				{text: "Rechercher des services TP-AMC", Icon: SearchNormal, href: "/tpAmcServiceEnLigne"},
				{text: "Rechercher des factures", Icon: SearchNormal, href: "/tpsFactures"},
				{text: "Créer une facture TPS", Icon: AddIcon, href: "/tpsFactures/create"}
			],
			title: 'Tiers payant',
			service: '', subTitle: ''
		},
		
		{
			Header: PaymentIcon,
			modules: [
				{text: "Acceuil", Icon: DashboardCustomizeOutlinedIcon, href: "/paiementdashboard"},
				{text: "Rechercher des paiements", Icon: SearchNormal, href: "/paiement"},
				{text: "Rechercher des virements", Icon: SearchNormal, href: "/virements"},
			],
			title: 'Paiement & Virement',
			service: '', subTitle: '',
		},
		
		{
			Header: MoneyCardEdit,
			modules: [
				{text: "Acceuil", Icon: DashboardCustomizeOutlinedIcon, href: "/indusdashboard"},
				{text: "Rechercher des indus", Icon: SearchNormal, href: "/indus"},
				{text: "Créer un indu", Icon: AddIcon, href: "/indus/create"},
				{text: "Rechercher des remboursements", Icon: SearchNormal, href: "/remboursements"},
				{text: "Créer un remboursement", Icon: AddIcon, href: "/remboursements/create", disabled: true},
			],
			title: 'Indu',
			service: '', subTitle: '',
		},
		
		{
			Header: User,
			modules: [
				{text: "Acceuil", Icon: DashboardCustomizeOutlinedIcon, href: "/benefdashboard"},
				{text: "Rechercher des droits bénéficiaire", Icon: SearchNormal, href: "/beneficiaire"},
			],
			title: "Droits bénéficiaires",
			service: "",
			subTitle: "Consulter les droits sur mes disciplines.",
		},
		
		{
			Header: PSIcon,
			modules: [
				{text: "Acceuil", Icon: DashboardCustomizeOutlinedIcon, href: "/psdashboard"},
				{text: "Rechercer un professionnel de santé", Icon: SearchNormal, href: "/ps"},
			],
			title: 'Professionnel de santé',
			service: '', subTitle: '',
		},
		
		{
			Header: MoneyArchive,
			modules: [
				{text: "Acceuil", Icon: DashboardCustomizeOutlinedIcon, href: "/intraitablesdashboard"},
				{text: "Rechercher des factures intraitables", Icon: SearchNormal, href: "/intraitables"},
			],
			title: 'Factures intraitables',
			service: '', subTitle: '',
		},
	
	];
	
	
	const psCards = [
		{
			Header: ROCIcon,
			modules: [
				{text: "Acceuil", Icon: SearchNormal, href: "/hospidashboard"},
				{text: "Rechercher des services ROC", Icon: SearchNormal, href: "/serviceEnLigne"},
				{text: "Rechercher des factures", Icon: SearchNormal, href: "/factures"}
			],
			title: 'Hospitalisation',
			service: '', subTitle: '',
		},
		
		{
			Header: ThirdPartyPaymentIcon,
			modules: [
				{text: "Acceuil", Icon: DashboardCustomizeOutlinedIcon, href: "/tpsdashboard"},
				{text: "Rechercher des services TP-AMC", Icon: SearchNormal, href: "/tpAmcServiceEnLigne"},
				{text: "Rechercher des factures", Icon: SearchNormal, href: "/tpsFactures"},
				{text: "Créer une facture TPS", Icon: AddIcon, href: "/tpsFactures/create"}
			],
			title: 'Tiers payant',
			service: '', subTitle: ''
		},
		
		{
			Header: ContentDocument,
			modules: [
				{text: "Acceuil", Icon: DashboardCustomizeOutlinedIcon, href: "/benefdashboard"},
				{text: "Rechercher des droits bénéficiaire", Icon: SearchNormal, href: "/beneficiaire"},
			],
			title: "Droits bénéficiaires",
			service: "",
			subTitle: "Consulter les droits sur mes disciplines.",
		},

		{
			Header: ContentDocument,
			modules: [
				{text: "Rechercher", Icon: SearchNormal, href: "/profile", disabled: true},
			],
			title: "Mon profil",
			service: "",
			subTitle: "Consulter les droits sur mes informations.",
		},
		{
			Header: ContentDocument,
			title: "Espace Demandes",
			modules: [
				{text: "Rechercher", Icon: SearchNormal, href: "https://dev-espace-ps.viamedis.fr/#/demandes", internal: false},
			],
			service: "",
			subTitle: "Créer et suivre mes demandes.",
		},
	];
	
	return (<>
		{!role && <div style={{height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
			<LoadingDots/>
		</div>}
		<Dashboard
			title={title}
			subTitle={userProfleSM({entity: 'subTitle', role, props: {subTitlePS, subTitleUser}})}
			cards={userProfleSM({entity: 'Dashboard', role, props: {psCards, gestionnerCards}})}
		/></>);
	
}
