import React, { Suspense, useEffect } from "lib_ui/react";
import ReactDOM from "lib_ui/react-dom";
import { Switch, Route, BrowserRouter } from "lib_ui/react-router-dom";
import { Provider } from "lib_ui/react-redux";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "shared_lib_ui/MUItheme";
import { store } from "shared_lib_ui/store";
import { DrawerProvider } from "shared_lib_ui/Lib/layout/drawers";
import { NotFound } from "shared_lib_ui/Lib/components";

import HostMenu from "./leftMenu/HostMenu";
import RemotePsApp from "ps_ui/RemotePsApp";
import RemoteBenefApp from "benef_ui/RemoteBenefApp";
import RemoteHospiApp from "hospi_ui/RemoteHospiApp";
import RemotePayementApp from "payment_ui/RemotePayementApp";
import RemoteIntraitablesApp from "intraitables_ui/RemoteIntraitablesApp";
import RemoteTPSApp from "tps_ui/RemoteTPSApp";
import RemoteAuthApp from "auth_ui/RemoteAuthApp";
import RemoteInduApp from "indu_ui/RemoteInduApp";

// Msal imports
import { MsalProvider, MsalAuthenticationTemplate } from "lib_ui/@azure-msal-react";
import { InteractionType, EventType } from "lib_ui/@azure-msal-browser";
import { msalInstance } from "shared_lib_ui/auth";

import {setAccount} from "shared_lib_ui/host";


const PageDashboard = () => (
    <Typography variant="h3" noWrap component="div" sx={{ padding: "15px 25px", color: "#003154" }}>
        Dashboard Page
    </Typography>
);

const PSremote = () => <RemotePsApp store={store}/>;
const BenefRemote = (props) => <RemoteBenefApp store={store} {...props} />;
const PayementRemote = () => <RemotePayementApp store={store}/>;
const HospiRemote = () => <RemoteHospiApp store={store}/>;
const TPSRemote = () => <RemoteTPSApp store={store}/>;
const IntraitablesRemote = () => <RemoteIntraitablesApp store={store}/>;
const AuthRemote = () => <RemoteAuthApp store={store}/>;
const InduRemote = () => <RemoteInduApp store={store} />;

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
										<Box component="main" sx={{flexGrow: 1}}>
											<Switch>
												
												<Route exact path="/" component={PageDashboard}/>
												
												<Route path={["/psdashboard", "/ps", "/auth"]}>
													<PSremote/>
												</Route>
												
												<Route path="/beneficiaire">
													<BenefRemote/>
												</Route>
												
												<Route path={["/paiementdashboard","/paiement", "/virements"]}>
													<PayementRemote/>
												</Route>
												
												<Route path={["/hospidashboard", "/serviceEnLigne", "/factures", "/intraitables", "/parametres"]}>
													<HospiRemote />
												</Route>
												
												<Route path={["/tpsdashboard","/tpsFactures/create", "/tpsFactures","/TpAmcFluxInfo","/tpAmcServiceEnLigne"]}>
													<TPSRemote/>
												</Route>
												
												<Route path={["/facturesintraitables","/intraitables"]}>
													<IntraitablesRemote/>
												</Route>
												
												<Route path={["/indu"]}>
													<InduRemote />
												</Route>
												
												<Route path={["/not-found", "*"]} component={NotFound}/>
											
											</Switch>
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
        <App />
    </StyledEngineProvider>,
    document.getElementById("root")
);
