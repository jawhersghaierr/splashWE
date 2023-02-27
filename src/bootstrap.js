import React, {Suspense, useState} from 'lib_ui/react';
import ReactDOM from 'lib_ui/react-dom';
import {Switch, Route, BrowserRouter, matchPath} from 'lib_ui/react-router-dom'
import { Provider } from 'lib_ui/react-redux';

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
import RemotePayementApp from "payment_ui/RemotePayementApp";
import RemoteHospiApp from "hospi_ui/RemoteHospiApp";

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


// const RemoteApp = React.lazy(() => dynamicFederation('hospi_ui', './RemoteApp'));

const PageDashboard = () => <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
  <b>Dashboard Page</b>
</Typography>

const PSremote = () => <RemotePsApp store={store} />
const BenefRemote = () => <RemoteBenefApp store={store} />
const PayementRemote = () => <RemotePayementApp store={store} />
const HospiRemote = () => <RemoteHospiApp store={store} />


const App = () => {

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


                  {/*<Route exact name={'ConfigurationDetailsById'} path="/configuration/:domain/:code/:id" component={ConfigurationDetailsById}/>*/}
                  {/*<Route exact name={'ConfigurationLists'} path="/configuration/:domain/:code" component={ListConfiguration}/>*/}
                  {/*<Route exact index={true} name={'Configuration'} path="/configuration" component={Configurations}/>*/}

                  {/*<Route exact name={'RocFluxInfo'} path="/serviceEnLigne/FluxInfo/:id?" render={(props) => (*/}
                  {/*    <RocFluxInfo factId={props.match.params.id} menu={setShown}/>*/}
                  {/*)} />*/}

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
