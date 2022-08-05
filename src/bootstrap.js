import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux';

import {Typography, CssBaseline} from "@mui/material";
import {
  useTheme,
  StyledEngineProvider,
  ThemeProvider,
  createTheme
} from "@mui/material/styles";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { store } from './store';

import {Comp1} from "./component1/Comp1";
import HostMenu from "./leftMenu/HostMenu";
import AppBar from "./utils/AppBar";
import DrawerHeader from "./utils/DrawerHeader";
import Drawer from "./utils/Drawer"
import {Ps} from './components/ps/PS'
import {Beneficiaire} from './components/beneficiaire/Beneficiaire'

// import { NameContextProvider } from '@viamedis-boilerPlate/shared-library';
import { purple } from '@mui/material/colors';
import './theme.scss'
import PsDetailsById from "./components/ps/PsDetailsById";
import BeneficiaireDetailsById from "./components/beneficiaire/BeneficiaireDetailsById";

const defaultTheme = createTheme();
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
const RemotePsApp = React.lazy(() => dynamicFederation('ps_ui', './RemotePsApp'));

const PageDashboard = () => <Typography variant="h3" component="div">Dashboard Page</Typography>
const Hospi = () => <Comp1/>
const PSremote = () => <RemotePsApp  store={store} />
const RemoteTest = () => <RemoteApp store={store} />


const App = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Provider store={store}>
      {/*<StyledEngineProvider injectFirst>*/}
      {/*<ThemeProvider theme={theme1}>*/}
        <Suspense fallback="Loading...">
          <BrowserRouter>
            {/*<div className={clsx('Host', classes.root)}>*/}
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                  <IconButton onClick={handleDrawer} style={{color: '#fff'}}>
                    {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <HostMenu />
              </Drawer>

              <Box component="main" sx={{ flexGrow: 1}}>
                <Switch>
                  <Route exact path="/" component={PageDashboard} />
                  <Route path="/Hospi" component={Hospi} />
                  <Route exact={true} path="/PS" component={Ps} />
                  <Route path="/PS/:id?" component={PsDetailsById}/>
                  <Route exact={true} path="/beneficiaire" component={Beneficiaire}/> />
                  <Route path="/beneficiaire/:id?" component={BeneficiaireDetailsById}/> />
                  <Route path="/test" component={RemoteTest}/> />
                  <Route path="/PSremote" component={PSremote} />
                </Switch>

              </Box>
            </Box>

          </BrowserRouter>
        </Suspense>
      {/*</ThemeProvider>*/}
      {/*</StyledEngineProvider>*/}
    </Provider>
  );
};

ReactDOM.render(
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>,
    document.getElementById('root')
);
