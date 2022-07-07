import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux';

import {Typography, CssBaseline} from "@mui/material";
import {useTheme, StyledEngineProvider } from '@mui/material/styles';
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

// import { NameContextProvider } from '@viamedis-boilerPlate/shared-library';

import './theme.scss'

const dynamicFederation = async (scope, module) => {
  const container = window[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  return container.get(module).then(factory => {
    const Module = factory();
    return Module;
  });
};


const RemoteApp = React.lazy(() => dynamicFederation('hospi_ui', './RemoteApp'));
const RemotePsApp = React.lazy(() => dynamicFederation('ps_ui', './RemotePsApp'));

const PageDashboard = () => <Typography variant="h3" component="h1">Dashboard Page</Typography>
const Hospi = () => <Comp1/>
// const PS = () => <Typography variant="h3" component="h1">PS App</Typography>
const PS = () => <RemotePsApp  store={store} />
const Beneficiary = () => <RemoteApp store={store} />


const App = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };


  // const remoteAppScope = 'remoteApp';
  // const state = useSelector(state => state);
  return (
    <Provider store={store}>

        <Suspense fallback="Loading...">
          <BrowserRouter>
            {/*<div className={clsx('Host', classes.root)}>*/}
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                  <IconButton onClick={handleDrawer}>
                    {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <HostMenu />
              </Drawer>

              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Switch>
                  <Route path="/" exact component={PageDashboard} />
                  <Route path="/Hospi" component={Hospi} />
                  <Route path="/PS" component={PS} />
                  <Route path="/Beneficiary" component={Beneficiary}/> />
                </Switch>

              </Box>
            </Box>

          </BrowserRouter>
        </Suspense>

    </Provider>
  );
};

ReactDOM.render(
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>,
    document.getElementById('root')
);
