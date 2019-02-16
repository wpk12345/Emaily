import 'materialize-css/dist/css/materialize.min.css';
import React from "react";
import ReactDOM from "react-dom";
import reduxThunk from 'redux-thunk';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";
import reducers from "./reducers";
//Test
//when setting up createStore the first arg is all the reducers you are going to be using.  second arg is the initial state of the app
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//reactDOM takes two arguments.  1.Our root component  &
//2.Where we are attempting to render that component to inside our DOM
ReactDOM.render(
  //the provider tag is the glue that helps react and redux communicate and work together.  it's essentially a react component
  //that knows how to read changes from the redux store.  so when there are state changes on the redux store, the provider
  //will inform all of it's children components (App) that some new state is avail, and it will update all of those components

  //on provider we pass store as a prop.  then pass App as a child of the provider tag
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// console.log('STRIP KEY IS ',  process.env.REACT_APP_STRIPE_KEY);
// console.log('Environment is ', process.env.NODE_ENV);
