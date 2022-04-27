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

const PageDashboard = () => <Typography variant="h3" component="h1">Dashboard Page</Typography>
const Hospi = () => <Comp1/>
const PS = () => <Typography variant="h3" component="h1">PS App</Typography>
const Beneficiary = () => <RemoteApp store={store} />


const App = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  // const remoteAppScope = 'remoteApp';
  // const state = useSelector(state => state);
  return (
    <Provider store={store}>
      {/*<NameContextProvider.Provider value="Dzagy testva">*/}
        <Suspense fallback="Loading...">
          <BrowserRouter>
            {/*<div className={clsx('Host', classes.root)}>*/}
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />

              <AppBar position="fixed" open={open}>
                <Toolbar>
                  <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                      }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">Viamedis</Typography>
                </Toolbar>
              </AppBar>

              <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <HostMenu />
              </Drawer>


              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />

                <Switch>
                  <Route path="/" exact component={PageDashboard} />
                  <Route path="/Hospi" component={Hospi} />
                  <Route path="/PS" component={PS} />
                  <Route path="/Beneficiary" component={Beneficiary}/> />
                </Switch>
                <Typography paragraph>
                  Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                  eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                  neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                  sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                  tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                  gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                  et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                  tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                  eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                  posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
              </Box>
            </Box>

          </BrowserRouter>
        </Suspense>
      {/*</NameContextProvider.Provider>*/}

    </Provider>
  );
};

ReactDOM.render(
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>,
    document.getElementById('root')
);
