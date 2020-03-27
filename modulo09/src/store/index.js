import { persistStore } from 'redux-persist';
import createSagaMiddleare from 'redux-saga';
import createStore from './createStore';

import persistReducer from '~/store/persistReducer';

import rootReducer from './rootReducer';
import rootSaga from '~/store/rootSaga';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleare({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistReducer(rootReducer), middlewares);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
