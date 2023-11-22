import React, {Suspense, useEffect} from "lib_ui/react";
import ReactDOM from "lib_ui/react-dom";
import {Switch, Route, BrowserRouter} from "lib_ui/react-router-dom";
import {Provider} from "lib_ui/react-redux";
import {StyledEngineProvider, ThemeProvider} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "shared_lib_ui/MUItheme";
import {store} from "shared_lib_ui/store";
import {DrawerProvider} from "shared_lib_ui/Lib/layout/drawers";
import {NotFound} from "shared_lib_ui/Lib/components";
import {TermsService} from "shared_lib_ui/Lib/layout";

import HostMenu from "./leftMenu/HostMenu";
import RemotePsApp from "ps_ui/RemotePsApp";
import RemoteBenefApp from "benef_ui/RemoteBenefApp";
import RemoteHospiApp from "hospi_ui/RemoteHospiApp";
import RemotePayementApp from "payment_ui/RemotePayementApp";
import RemoteIntraitablesApp from "intraitables_ui/RemoteIntraitablesApp";
import RemoteTPSApp from "tps_ui/RemoteTPSApp";
import RemoteInduApp from "indu_ui/RemoteInduApp";
import {Link} from "react-router-dom";

// Msal imports
import {MsalProvider, MsalAuthenticationTemplate} from "lib_ui/@azure-msal-react";
import {InteractionType, EventType} from "lib_ui/@azure-msal-browser";
import {msalInstance} from "shared_lib_ui/auth";

import {setAccount} from "shared_lib_ui/host";


const PageDashboard = () => (
	<Typography variant="h3" noWrap component="div" sx={{padding: "15px 25px", color: "#003154"}}>
		Dashboard Page
	</Typography>
);

const PSremote = () => <RemotePsApp store={store}/>;
const BenefRemote = (props) => <RemoteBenefApp store={store} {...props} />;
const PayementRemote = () => <RemotePayementApp store={store}/>;
const HospiRemote = () => <RemoteHospiApp store={store}/>;
const TPSRemote = () => <RemoteTPSApp store={store}/>;
const InduRemote = () => <RemoteInduApp store={store}/>;
const IntraitablesRemote = () => <RemoteIntraitablesApp store={store}/>;
const AuthRemote = () => <RemoteAuthApp store={store}/>;

const App = () => {
	
	useEffect(() => {
		const callbackId = msalInstance.addEventCallback((event) => {
			
			switch (event.eventType) {
				case EventType.ACQUIRE_TOKEN_SUCCESS:
					store.dispatch(setAccount(event.payload));
					break
				
				case EventType.LOGIN_SUCCESS:
					if (event.payload) {
						const account = event.payload;
						msalInstance.setActiveAccount(account);
						store.dispatch(setAccount(account));
					}
					break
			}
		});
		
		return () => {
			if (callbackId) msalInstance.removeEventCallback(callbackId);
		}
		
	}, []);
	
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<DrawerProvider>
					<BrowserRouter>
						<Suspense fallback="Loading...">
							<MsalProvider instance={msalInstance}>
								<MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
									
									<Box sx={{display: "flex"}}>
										<CssBaseline/>
										<HostMenu/>
										<Box component="main" sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
											<Switch>
												<Route exact path="/" component={PageDashboard}/>
												
												<Route path={["/psdashboard", "/ps", "/auth"]}>
													<PSremote/>
												</Route>
												
												<Route
													path={["/terms", "/terms/terms-of-service", "/terms/legal-notice", "/terms/personal-data-protection-policy"]}>
													<TermsService/>
												</Route>
												
												<Route path="/beneficiaire">
													<BenefRemote/>
												</Route>
												
												<Route path={["/paiementdashboard", "/paiement", "/virements"]}>
													<PayementRemote/>
												</Route>
												
												<Route
													path={["/hospidashboard", "/serviceEnLigne", "/factures", "/intraitables", "/parametres"]}>
													<HospiRemote/>
												</Route>
												
												<Route
													path={["/tpsdashboard", "/tpsFactures/create", "/tpsFactures", "/TpAmcFluxInfo", "/tpAmcServiceEnLigne"]}>
													<TPSRemote/>
												</Route>
												
												<Route path={["/indusdashboard", "/indus", "/remboursements"]}>
													<InduRemote/>
												</Route>
												
												<Route path={["/intraitablesdashboard", "/facturesintraitables", "/intraitables"]}>
													<IntraitablesRemote/>
												</Route>
												
												<Route path={["/not-found", "*"]} component={NotFound}/>
											
											</Switch>
											
											<div id="footer" style={{
												alignSelf: 'center',
												textAlign: 'center',
												minHeight: '20px',
												padding: '5px',
												maxWidth: '90%'
											}}>
												<Link color="inherit" to="/terms"
												      style={{textDecoration: 'none'}}>Conditions générales</Link>
												&nbsp;&nbsp;&nbsp;
												<Link color="inherit" to="/terms/legal-notice" style={{textDecoration: 'none'}}>Mentions
													légales</Link>
												&nbsp;&nbsp;&nbsp;
												<Link color="inherit" to="/terms/terms-of-service"
												      style={{textDecoration: 'none'}}>terms-of-service</Link>
												&nbsp;&nbsp;&nbsp;
												<Link color="inherit" to="/terms/personal-data-protection-policy"
												      style={{textDecoration: 'none'}}>Politique de protection des données</Link>
											</div>
										
										</Box>
									</Box>
								
								</MsalAuthenticationTemplate>
							</MsalProvider>
						
						</Suspense>
					</BrowserRouter>
				</DrawerProvider>
			</ThemeProvider>
		</Provider>
	);
};

ReactDOM.render(
	<StyledEngineProvider injectFirst>
		<App/>
	</StyledEngineProvider>,
	document.getElementById("root")
);
