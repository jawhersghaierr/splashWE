import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";
import thunkMiddleware from 'redux-thunk';

import { referentielApi } from './services/referentielApi';
import { refsApi } from './services/refsApi';
import { psApi } from "./components/ps/services/psApi";
import { facturesApi } from "./components/factures/services/facturesApi";
import { beneficiaireApi } from "./components/beneficiaire/services/beneficiaireApi";
import { paiementsApi } from "./components/paiement/services/paiementsApi";
import { virementsApi } from "./components/virement/services/virementsApi";
import { selAndIdbApi } from "./components/factures/services/selAndIdbApi";
import { fluxApi } from "./components/factures/services/fluxApi";
import {intraitablesApi} from "./components/intraitables/services/intraitablesApi";
import { configurationsApi } from "./components/configurations/services/configurationsApi";
import {rocEnLigneApi} from "./components/rocEnLigne/services/rocEnLigneApi";

import psReducer from './components/ps/psSlice'
import paiementsReducer from './components/paiement/paiementSlice'
import virementsReducer from './components/virement/virementsSlice'
import benefReducer from './components/beneficiaire/beneficiaireSlice'
import intraitablesReducer from './components/intraitables/intraitablesSlice'
import facturesReducer from "./components/factures/facturesSlice";
import configurationsReducer from './components/configurations/configurationsSlice';
import rocEnLigneReducer from "./components/rocEnLigne/rocEnLigneSlice";

function logger({ getState }) {
  return next => action => {

    const returnValue = next(action)

    return returnValue
  }
}

const initialState = {
  appName: 'host',
};

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const staticReducers = {
  host: hostReducer,
};

export default function configureStore(initialState) {

  const middleware = applyMiddleware(
      refsApi.middleware,
      referentielApi.middleware,
      psApi.middleware,
      paiementsApi.middleware,
      virementsApi.middleware,
      selAndIdbApi.middleware,
      facturesApi.middleware,
      beneficiaireApi.middleware,
      fluxApi.middleware,
      configurationsApi.middleware,
      intraitablesApi.middleware,
      rocEnLigneApi.middleware,
      ...[thunk, thunkMiddleware, logger]);
  const composeEnhancers =
      typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
          ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
          : compose;
  // const composeEnhancers =
  //   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  //     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  //     : compose(applyMiddleware(...middleware), ...enhancers);

  const enhancer = composeEnhancers(middleware);
  let store = createStore(createReducer(), enhancer);
  // const nextReducer = require('@/reducers').default; // eslint-disable-line global-require
  store = {
    ...store,
    asyncReducers: {},
    injectReducer: (key, asyncReducer) => {
      store.asyncReducers[key] = asyncReducer;
      store.replaceReducer(createReducer(store.asyncReducers));
    },
  };

  return store;
}

function createReducer(asyncReducers) {
  return combineReducers({

    [refsApi.reducerPath]: refsApi.reducer,
    [referentielApi.reducerPath]: referentielApi.reducer,

    [psApi.reducerPath]: psApi.reducer,
    [paiementsApi.reducerPath]: paiementsApi.reducer,
    [virementsApi.reducerPath]: virementsApi.reducer,
    [selAndIdbApi.reducerPath]: selAndIdbApi.reducer,
    [facturesApi.reducerPath]: facturesApi.reducer,
    [beneficiaireApi.reducerPath]: beneficiaireApi.reducer,
    [fluxApi.reducerPath]: fluxApi.reducer,
    [configurationsApi.reducerPath]: configurationsApi.reducer,
    [intraitablesApi.reducerPath]: intraitablesApi.reducer,
    [rocEnLigneApi.reducerPath]: rocEnLigneApi.reducer,

    ps: psReducer,
    benef: benefReducer,
    factures: facturesReducer,
    paiements: paiementsReducer,
    virements: virementsReducer,
    intraitables: intraitablesReducer,
    rocEnLigne: rocEnLigneReducer,
    configurations: configurationsReducer,
    ...staticReducers,
    ...asyncReducers,
  });
}

export const store = configureStore();
