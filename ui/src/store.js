import { compose, applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleWare = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;

// const initialState = {};
// const middleware = [thunk];

// const persistConfig = {
//   key: 'root',
//   storage: storage,
//   blacklist: ['alert']
// };

// const pReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(
//   pReducer,
//   initialState,
//   applyMiddleware(...middleware)
// );

// const persistor = persistStore(store);

// export { persistor, store };
