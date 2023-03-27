import React, {Suspense, useState, useEffect} from 'lib_ui/react';
import ReactDOM from 'lib_ui/react-dom';
import {Switch, Route, BrowserRouter, matchPath} from 'lib_ui/react-router-dom'
import { Provider } from 'lib_ui/react-redux';

import { refsApi, referentielApi } from "shared_lib_ui/services";
import { addMiddleware } from "lib_ui/redux-dynamic-middlewares";

import paiementReducer from "payment_ui/paiementSlice";
import { paiementsApi } from "payment_ui/paiementsApi";
import facturesReducer from "hospi_ui/facturesSlice";
import {facturesApi} from "hospi_ui/facturesApi";
import {factureFluxApi} from "hospi_ui/factureFluxApi";
import {factureSelAndIdbApi} from "hospi_ui/factureSelAndIdbApi";

import {rocSelAndIdbApi} from "hospi_ui/rocSelAndIdbApi";
import {rocEnLigneApi} from "hospi_ui/rocEnLigneApi";
import {rocFluxApi} from "hospi_ui/rocFluxApi";
import rocEnLigneReducer from "hospi_ui/rocEnLigneSlice";

import {intraitablesApi} from "hospi_ui/intraitablesApi";
import intraitablesReducer from "hospi_ui/intraitablesSlice";

import {virementsApi} from "payment_ui/virementsApi";
import virementsReducer from "payment_ui/virementsSlice";

import {configurationsApi} from "./components/configurations/services/configurationsApi";
import configurationsReducer from "./components/configurations/configurationsSlice";


import {Typography, CssBaseline} from "@mui/material";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  // responsiveFontSizes
} from "@mui/material/styles";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { store } from 'shared_lib_ui/store';

import HostMenu from "./leftMenu/HostMenu";
// import {Drawer} from "shared_lib_ui/Lib"
import Drawer from "./components/Drawer"

import ConfigurationDetailsById from "./components/configurations/ConfigurationDetailsById";
import {ListConfiguration} from "./components/configurations/ListConfiguration";
import {Configurations} from "./components/configurations/Configurations";

import LogoIcon from '../assets/icons/LogoIcon';
import LogoTextIcon from '../assets/icons/LogoTextIcon';
import RemotePsApp from "ps_ui/RemotePsApp";
import RemoteBenefApp from "benef/RemoteBenefApp";
import RemoteHospiApp from "hospi_ui/RemoteHospiApp";
import RemotePayementApp from "payment_ui/RemotePayementApp";

import 'shared_lib_ui/theme';

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


// const RemoteHospiApp = React.lazy(() => dynamicFederation('hospi_ui', './RemoteApp'));

const PageDashboard = () => <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
  <b>Dashboard Page</b>
</Typography>

const PSremote = () => <RemotePsApp store={store} />
const BenefRemote = () => <RemoteBenefApp store={store} />
const PayementRemote = () => <RemotePayementApp store={store} />
const HospiRemote = () => <RemoteHospiApp store={store} />

const ConfigurationBase = () => <Configurations store={store} />
const ListConfigurationBase = () => <ListConfiguration store={store} />
const ConfigurationDetailsByIdBase = () => <ConfigurationDetailsById store={store} />


const App = () => {

  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(true);


  useEffect(() => {
    // console.log('configurationsReducer > ', configurationsReducer)
    //
    store.injectReducer("configurations", configurationsReducer);
    store.injectReducer([configurationsApi.reducerPath], configurationsApi.reducer);

    store.injectReducer("paiements", paiementReducer);
    store.injectReducer([paiementsApi.reducerPath], paiementsApi.reducer);

    store.injectReducer("virements", virementsReducer);
    store.injectReducer([virementsApi.reducerPath], virementsApi.reducer);

    store.injectReducer("factures", facturesReducer);
    store.injectReducer([facturesApi.reducerPath], facturesApi.reducer);

    store.injectReducer([factureFluxApi.reducerPath], factureFluxApi.reducer);
    store.injectReducer([factureSelAndIdbApi.reducerPath], factureSelAndIdbApi.reducer);

    store.injectReducer("RocEnLigne", rocEnLigneReducer);
    store.injectReducer([rocEnLigneApi.reducerPath], rocEnLigneApi.reducer);
    store.injectReducer([rocFluxApi.reducerPath], rocFluxApi.reducer);
    store.injectReducer([rocSelAndIdbApi.reducerPath], rocSelAndIdbApi.reducer);

    store.injectReducer("intraitables", intraitablesReducer);
    store.injectReducer([intraitablesApi.reducerPath], intraitablesApi.reducer);

    addMiddleware(
        configurationsApi.middleware,

        paiementsApi.middleware,
        virementsApi.middleware,

        refsApi.middleware,
        referentielApi.middleware,

        facturesApi.middleware,
        factureFluxApi.middleware,
        factureSelAndIdbApi.middleware,

        rocEnLigneApi.middleware,
        rocSelAndIdbApi.middleware,
        rocFluxApi.middleware,

        intraitablesApi.middleware,
    );
  }, []);


  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Provider store={store}>
      {/*<StyledEngineProvider injectFirst>*/}
      <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback="Loading...">
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

                  {/*<Route path="/configuration/:domain/?:code/?:id?" name={'ConfigurationDetailsByIdBase'}>*/}
                  {/*  <ConfigurationDetailsByIdBase />*/}
                  {/*</Route>*/}
                  {/*<Route path="/configuration/:domain/?:code?" name={'ConfigurationLists'}>*/}
                  {/*  <ListConfigurationBase />*/}
                  {/*</Route>*/}
                  {/*<Route path="/configuration" exact={true} index={true} >*/}
                  {/*  <ConfigurationBase />*/}
                  {/*</Route>*/}

                  <Route exact={true} index={true} name={'Configuration'} path="/configuration" component={ConfigurationBase}/>
                  <Route exact={true} name={'ConfigurationLists'} path="/configuration/:domain/:code" component={ListConfigurationBase}/>
                  <Route exact={true} name={'ConfigurationDetailsById'} path="/configuration/:domain/:code/:id" component={ConfigurationDetailsByIdBase}/>

                  <Route path="/PS">
                    <PSremote />
                  </Route>
                  <Route path="/beneficiaire">
                    <BenefRemote />
                  </Route>

                  {/*<Route path={ "/paiement" | "/virements" } render={(props) => (*/}
                  {/*    <PayementRemote/>*/}
                  {/*)}/>*/}

                  <Route path="/paiement">
                    <PayementRemote />
                  </Route>
                  <Route path="/virements">
                    <PayementRemote />
                  </Route>

                  <Route path={["/intraitables", "/serviceEnLigne", "/factures"]} render={(props) => (
                      <HospiRemote match={props.match}/>
                  )}/>


                  {/*<Route exact name={'RocFluxInfo'} path="/serviceEnLigne/FluxInfo/:id?" render={(props) => (*/}
                  {/*    <RocFluxInfo factId={props.match.params.id} menu={setShown}/>*/}
                  {/*)} />*/}

                </Switch>

              </Box>
            </Box>

            </Suspense>
          </BrowserRouter>
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
