import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";
import thunkMiddleware from 'redux-thunk';
//TODO need automation - import object/array index files from slice folders
// import { entityApi } from './services/entityApi';
// import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import comp1Reducer from './component1/comp1Slice';
import { referentielApi } from './services/referentielApi';
import { refsApi } from './services/refsApi';
import { psApi } from "./components/ps/services/psApi";
import { facturesApi } from "./components/factures/services/facturesApi";
import { beneficiaireApi } from "./components/beneficiaire/services/beneficiaireApi";
import { paiementsApi } from "./components/factures/services/paiementsApi";
import { selAndIdbApi } from "./components/factures/services/selAndIdbApi";

import psReducer from './components/ps/psSlice'
import benefReducer from './components/beneficiaire/beneficiaireSlice'
import facturesReducer from "./components/factures/facturesSlice";

function logger({ getState }) {
  return next => action => {
    // console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    // console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
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



/**
 * Cf. redux docs:
 * https://redux.js.org/recipes/code-splitting/#defining-an-injectreducer-function
 */
export default function configureStore(initialState) {

  const middleware = applyMiddleware(
      refsApi.middleware,
      referentielApi.middleware,
      psApi.middleware,
      paiementsApi.middleware,
      selAndIdbApi.middleware,
      facturesApi.middleware,
      beneficiaireApi.middleware,
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
    // [entityApi.reducerPath]: entityApi.reducer,
    [refsApi.reducerPath]: refsApi.reducer,
    [referentielApi.reducerPath]: referentielApi.reducer,
    //TODO need automation - received object/array with reducers by index files from slice folders
    comp1: comp1Reducer,
    [psApi.reducerPath]: psApi.reducer,
    [paiementsApi.reducerPath]: paiementsApi.reducer,
    [selAndIdbApi.reducerPath]: selAndIdbApi.reducer,
    [facturesApi.reducerPath]: facturesApi.reducer,
    [beneficiaireApi.reducerPath]: beneficiaireApi.reducer,
    ps: psReducer,
    benef: benefReducer,
    factures: facturesReducer,
    ...staticReducers,
    ...asyncReducers,
  });
}

export const store = configureStore();
