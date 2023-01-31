import React, {Suspense, useState} from 'react';
import ReactDOM from 'react-dom';

import {Switch, Route, BrowserRouter, matchPath} from 'react-router-dom'

import { Provider } from 'react-redux';

import {Typography, CssBaseline} from "@mui/material";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes
} from "@mui/material/styles";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { store } from './store';

// import {Comp1} from "./component1/Comp1";
import HostMenu from "./leftMenu/HostMenu";
import Drawer from "./components/shared/Drawer"
import {Ps} from './components/ps/PS'
import {Beneficiaire} from './components/beneficiaire/Beneficiaire'
import {Test} from './components/beneficiaire/Test'

// import { NameContextProvider } from '@viamedis-boilerPlate/shared-library';
import './theme.scss'
import PsDetailsById from "./components/ps/PsDetailsById";
import BeneficiaireDetailsById from "./components/beneficiaire/BeneficiaireDetailsById";
import FacturesDetailsById from "./components/factures/FacturesDetailsById";
import {Factures} from "./components/factures/Factures";
import ConfigurationDetailsById from "./components/configurations/ConfigurationDetailsById";
import {ListConfiguration} from "./components/configurations/ListConfiguration";
import {Configurations} from "./components/configurations/Configurations";
import {Intraitables} from "./components/intraitables/Intraitables";
import {Paiement} from "./components/paiement/Paiement";
import PaiementDetailsById from "./components/paiement/PaiementDetailsById";
import {Virement} from "./components/virement/Virement";
import VirementDetailsById from "./components/virement/VirementDetailsById";
import {RocEnLigne} from "./components/rocEnLigne/RocEnLigne";
import RocEnLigneDetailsById from "./components/rocEnLigne/RocEnLigneDetailsById";
import {FluxInfo as FacturesFluxInfo} from "./components/factures/components/FluxInfo";
import {FluxInfo as RocFluxInfo} from "./components/rocEnLigne/components/FluxInfo";
import LogoIcon from '../assets/icons/LogoIcon';
import LogoTextIcon from '../assets/icons/LogoTextIcon';

import { loadComponent } from './utils/remote-utils';
import { remotes1 } from '../env-vars';

let theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Gotha',
      textTransform: 'none',
      // fontSize: 16,
    },
  },
  boldTypography: {
    fontWeight: 'inherit',
  }
});

const theme1 = createTheme({
  palette: {
    // augmentColor is a step that Material-UI automatically does for the standard palette colors.
    badg1: {
      main: '#FF5D5D',
      light: '#90a4ae',
      dark: '#37474f',
      contrastText: '#ffffff',
    },
    badg2: {
      main: '#C7F99F',
      light: '#90a4ae',
      dark: '#37474f',
      contrastText: '#ffffff',
    },
    badg3: {
      main: '#FFD4AD',
      light: '#90a4ae',
      dark: '#37474f',
      contrastText: '#ffffff',
    },
  }
});

const dynamicFederation = async (scope, module) => {
  const container = window[scope]; // or get the container somewhere else

  await container.init(__webpack_share_scopes__.default);
  return container.get(module).then(factory => {
    const Module = factory();
    return Module;
  });
};


const RemoteApp = React.lazy(() => dynamicFederation('hospi_ui', './RemoteApp'));
// const RemotePsApp = React.lazy(() => dynamicFederation('ps_ui', './RemotePsApp'));
const RemotePsApp = React.lazy(loadComponent(
  remotes1.ps_ui.title,
  'default',
  `./${remotes1.ps_ui.component}`,
  `${remotes1.ps_ui.url}:${remotes1.ps_ui.port}/remoteEntry.js`
));

const PageDashboard = () => <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
  <b>Dashboard Page</b>
</Typography>

// const Hospi = () => <Comp1/>
// const PSremote = () => <RemotePsApp store={store} />
const PSremote = () => <RemotePsApp store={store} />
const RemoteTest = () => <RemoteApp store={store} />


const App = () => {

  // theme = responsiveFontSizes(theme);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Provider store={store}>
      {/*<StyledEngineProvider injectFirst>*/}
      <ThemeProvider theme={theme}>
        <Suspense fallback="Loading...">
          <BrowserRouter>
            {/*<div className={clsx('Host', classes.root)}>*/}
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              {shown && <Drawer variant="permanent" open={open}>
                <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: "#1A4565 !important" }}>
                  <LogoIcon onClick={handleDrawer} viewBox="0 0 200 200" sx={{ flex: "1 0 auto", margin: "0.6em auto !important", fontSize: "2em !important"}}/>
                  {open && <LogoTextIcon viewBox="0 0 294.2 56.3" sx={{ flex: "1 0 auto", width: "5em !important", margin: "1em 1em 1em 0 !important"}}/>}
                </Box>
                <Divider />
                <HostMenu collapsed={!open} />
              </Drawer>
              }
              <Box component="main" sx={{ flexGrow: 1}}>
                <Switch>
                  <Route exact path="/" component={PageDashboard} />
                  {/*<Route path="/Hospi" component={Hospi} />*/}
                  {/*<Route exact={true} path="/PS" component={PSremote} />*/}
                  <Route path="/PS">
                    <PSremote />
                  </Route>
                  {/* <Route path="/PS/:id?" component={PsDetailsById}/> */}
                  <Route exact={true} path="/beneficiaire" component={Beneficiaire}/>
                  <Route exact={true} path="/beneficiaire/:id?" component={BeneficiaireDetailsById}/>
                  <Route path="/ligne" component={RemoteTest}/>

                  <Route exact name={'FactureFluxInfo'} path="/factures/FluxInfo/:id?" render={(props) => (
                      <FacturesFluxInfo factId={props.match.params.id} menu={setShown}/>
                  )} />
                  <Route path="/factures/:id" component={FacturesDetailsById}/>
                  <Route exact={true} path="/factures" component={Factures}/>

                  <Route exact name={'ConfigurationDetailsById'} path="/configuration/:domain/:code/:id" component={ConfigurationDetailsById}/>
                  <Route exact name={'ConfigurationLists'} path="/configuration/:domain/:code" component={ListConfiguration}/>
                  <Route exact index={true} name={'Configuration'} path="/configuration" component={Configurations}/>

                  <Route exact={true} path="/paiement" component={Paiement}/>
                  <Route path="/paiement/:id?" component={PaiementDetailsById}/>

                  {/*<Route exact name={'FluxInfo'} path="/serviceEnLigne/FluxInfo/:id?" component={RocFluxInfo}/>*/}
                  <Route exact name={'RocFluxInfo'} path="/serviceEnLigne/FluxInfo/:id?" render={(props) => (
                      <RocFluxInfo factId={props.match.params.id} menu={setShown}/>
                  )} />
                  <Route exact name={'RocEnLigneDetailsById'} path="/serviceEnLigne/:id" component={RocEnLigneDetailsById}/>
                  <Route exact index={true} name={'RocEnLigne'} path="/serviceEnLigne" component={RocEnLigne}/>

                  <Route exact={true} path="/virements" component={Virement}/>
                  <Route path="/virements/:id?" component={VirementDetailsById}/>
                  <Route path="/intraitables" component={Intraitables}/>
                  <Route path="/intraitFactures" component={RemoteTest}/>
                  <Route path="/test" component={Test}/>
                  <Route path="/PSremote" component={PSremote} />
                </Switch>

              </Box>
            </Box>

          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
      {/*</StyledEngineProvider>*/}
    </Provider>
  );
};

ReactDOM.render(
    <StyledEngineProvider injectFirst>
      <App />,
    </StyledEngineProvider>,
    document.getElementById('root')
);
