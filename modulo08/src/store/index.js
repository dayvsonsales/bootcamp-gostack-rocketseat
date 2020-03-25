import { persistStore } from 'redux-persist';
import createSagaMiddleare from 'redux-saga';
import createStore from './createStore';

import persistReducers from '~/store/persistReducer';

import rootReducer from '~/store/rootReducer';
import rootSaga from '~/store/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleare({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
