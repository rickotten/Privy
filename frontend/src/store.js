// FOR REDUX
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// Prevent reset on refresh
function saveToLocalStorage(state) {
  console.log("Saving")
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log(err)
    return undefined;
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return {};
    return JSON.parse(serializedState)
  } catch (err) {
    console.log(err)
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleWare)))

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;
