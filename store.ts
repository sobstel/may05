import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import sagas from "./sagas";

// middlewares
const sagaMiddleware = createSagaMiddleware();
const middlewares = compose(applyMiddleware(sagaMiddleware));

// store
const store = createStore(reducers, middlewares);
sagaMiddleware.run(sagas);

export default store;
