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
	const subTitleUser = "tiers payant";
	
	const user = useSelector(getUser);
	
	let role = null
	if (user?.idTokenClaims) role = user?.idTokenClaims?.extension_finess ? "PS" : "GESTIONAIRE"
	
	const gestionnerCards = [
		{
			Header: ROCIcon,
			modules: [
				{text: "Accueil", code: 'ALL', Icon: DashboardCustomizeOutlinedIcon, href: "/hospidashboard"},
				{text: "Rechercher des services ROC", code: 'ROC', Icon: SearchNormal, href: "/serviceEnLigne"},
				{text: "Rechercher des factures", code: 'HFAC', Icon: SearchNormal, href: "/factures"}
			],
			title: 'Hospitalisation',
			service: '', subTitle: '',
		},
		
		{
			Header: ThirdPartyPaymentIcon,
			modules: [
				{text: "Accueil", code: 'ALL', Icon: DashboardCustomizeOutlinedIcon, href: "/tpsdashboard"},
				{text: "Rechercher des services TP-AMC", code: 'TPAMC', Icon: SearchNormal, href: "/tpAmcServiceEnLigne"},
				{text: "Rechercher des factures", code: 'TPS', Icon: SearchNormal, href: "/tpsFactures"},
				{text: "Créer une facture", code: 'TPS', Icon: AddIcon, href: "/tpsFactures/create"}
			],
			title: 'Tiers payant simple',
			service: '', subTitle: ''
		},
		
		{
			Header: PaymentIcon,
			modules: [
				{text: "Accueil", code: 'PAI', Icon: DashboardCustomizeOutlinedIcon, href: "/paiementdashboard"},
				{text: "Rechercher des paiements", code: 'PAI', Icon: SearchNormal, href: "/paiement"},
				{text: "Rechercher des virements", code: 'PAI', Icon: SearchNormal, href: "/virements"},
			],
			title: 'Paiement',
			service: '', subTitle: '',
		},
		
		{
			Header: MoneyCardEdit,
			modules: [
				{text: "Accueil", code: 'INDU', Icon: DashboardCustomizeOutlinedIcon, href: "/indusdashboard"},
				{text: "Rechercher des indus", code: 'INDU', Icon: SearchNormal, href: "/indus"},
				{text: "Créer un indu", code: 'INDU', Icon: AddIcon, href: "/indus/create"},
				{text: "Rechercher des remboursements", code: 'INDU', Icon: SearchNormal, href: "/remboursements"},
				{text: "Créer un remboursement", code: 'INDU', Icon: AddIcon, href: "/remboursements/create", disabled: true},
			],
			title: 'Indu',
			service: '', subTitle: '',
		},
		
		{
			Header: User,
			modules: [
				{text: "Accueil", code: 'DRB', Icon: DashboardCustomizeOutlinedIcon, href: "/benefdashboard"},
				{text: "Rechercher des droits bénéficiaire", code: 'DRB', Icon: SearchNormal, href: "/beneficiaire"},
			],
			title: "Droits bénéficiaires",
			service: "",
			subTitle: "",
		},
		
		{
			Header: PSIcon,
			modules: [
				{text: "Accueil", code: 'PS', Icon: DashboardCustomizeOutlinedIcon, href: "/psdashboard"},
				{text: "Rechercher un professionnel de santé", code: 'PS', Icon: SearchNormal, href: "/ps"},
			],
			title: 'Professionnel de santé',
			service: '', subTitle: '',
		},
		
		{
			Header: MoneyArchive,
			modules: [
				{text: "Accueil", code: 'FIN', Icon: DashboardCustomizeOutlinedIcon, href: "/intraitablesdashboard"},
				{text: "Rechercher des factures intraitables", code: 'FIN', Icon: SearchNormal, href: "/intraitables"},
			],
			title: 'Factures intraitables',
			service: '', subTitle: '',
		},
	
	];
	
	
	const psCards = [
		{
			Header: ROCIcon,
			modules: [
				{text: "Accueil", code: 'ALL', Icon: SearchNormal, href: "/hospidashboard"},
				{text: "Rechercher des services ROC", code: 'ROC', Icon: SearchNormal, href: "/serviceEnLigne"},
				{text: "Rechercher des factures", code: 'HFAC', Icon: SearchNormal, href: "/factures"}
			],
			title: 'Hospitalisation',
			service: '', subTitle: '',
		},
		
		{
			Header: ThirdPartyPaymentIcon,
			modules: [
				{text: "Accueil", code: 'ALL', Icon: DashboardCustomizeOutlinedIcon, href: "/tpsdashboard"},
				{text: "Rechercher des services TP-AMC", code: 'TPAMC', Icon: SearchNormal, href: "/tpAmcServiceEnLigne"},
				{text: "Rechercher des factures", code: 'TPS', Icon: SearchNormal, href: "/tpsFactures"},
				{text: "Créer une facture", code: 'TPS', Icon: AddIcon, href: "/tpsFactures/create"}
			],
			title: 'Tiers payant simple',
			service: '', subTitle: ''
		},
		
		{
			Header: ContentDocument,
			modules: [
				{text: "Accueil", code: 'DRB', Icon: DashboardCustomizeOutlinedIcon, href: "/benefdashboard"},
				{text: "Rechercher des droits bénéficiaire", code: 'DRB', Icon: SearchNormal, href: "/beneficiaire"},
			],
			title: "Droits bénéficiaires",
			service: "",
			subTitle: "",
		},
		
		{
			Header: ContentDocument,
			modules: [
				{text: "Rechercher", code: 'ALL', Icon: SearchNormal, href: "/profile", disabled: true},
			],
			title: "Mon profil",
			service: "",
			subTitle: "Consulter les droits sur mes informations.",
		},
		{
			Header: ContentDocument,
			title: "Espace Demandes",
			modules: [
				{
					text: "Rechercher",
					code: 'ALL',
					Icon: SearchNormal,
					href: "https://dev-espace-ps.viamedis.fr/#/demandes",
					internal: false
				},
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
			subTitle={userProfleSM({
				entity: 'subTitle',
				role,
				props: {
					subTitlePS,
					subTitleUser,
					claims: user?.idTokenClaims
				}
			})}
			cards={userProfleSM({
				entity: 'Dashboard',
				role,
				props: {
					psCards,
					gestionnerCards,
					claims: user?.idTokenClaims
				}
			})}
		/></>);
	
}
