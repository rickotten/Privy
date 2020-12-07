import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

import Alerts from './layout/Alerts';
import RegistrationForm from "./registration/RegistrationForm";
import LoginForm from "./login/LoginForm";
// import User from "./user/User";
import PrivateRoute from "./common/PrivateRoute";
import ForgotCredentialsForm from "./login/ForgotCredentialsForm";
import HomePage from "./layout/HomePage";
import UserTimeline from "./layout/UserTimeline"
import UserPostForm from "./posts/UserPostForm"
import User from "./user/User"
import Logout from "./user/Logout"

import './darkMode.css'


import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import UserProfile from "./user/UserProfile";
import ArbitraryUserProfile from "./user/ArbitraryUserProfile";
import PrivacyPage from "./privacy/PrivacyPage";
import CreatePageForm from "./pages/CreatePageForm"
import Page from "./pages/Page"
import LandingPage from "./landing/LandingPage";
import MyPages from "./pages/MyPages"
import SearchFormExample from "./searches/SearchFormExample";
import SearchResultsExample from "./searches/SearchResultsExample";
import SearchUsers from "./searches/SearchUsers";


// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

const LIGHT = "light";
const DARK = "dark";

const LightTheme = React.lazy(() => import('./myStyles.css'));
const DarkTheme = React.lazy(() => import('./darkMode.css'))

const ThemeSelect = ({ children }) => {

  // const currentTheme = localStorage.getItem('THEME');
  const currentTheme = DARK; // You will want to change this eventually
  return (
    <>
    <React.Suspense fallback={<></>}>
      {(currentTheme === LIGHT) && <LightTheme/>}
      {(currentTheme === DARK) && <DarkTheme/>}
    </React.Suspense>
    {children}
    </>
  )
}



//<Route exact path="/searchpages/:terms" component={}/>
//^^^ Route for searching pages- need SearchPages.js first





export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <PrivateRoute exact path="/settings" component={PrivacyPage} />
                  <PrivateRoute exact path="/pages" component={MyPages}/>
                  <PrivateRoute exact path="/profile/:username" component={ArbitraryUserProfile} />
                  <PrivateRoute exact path="/profile" component={UserProfile} />
                  <Route exact path="/register" component={RegistrationForm} />
                  <Route exact path="/login" component={LoginForm} />
                  <PrivateRoute exact path="/forgot" component={ForgotCredentialsForm} />
                  <Route exact path="/users/:username" component={UserTimeline} />
                  <PrivateRoute exact path="/createpost" component={UserPostForm} />
                  <PrivateRoute exact path="/logout" component={Logout} />
                  <PrivateRoute exact path="/pages/create" component={CreatePageForm} />
                  <Route exact path="/pages/:pageID" component={Page} />
                  <Route exact path="/landing" component={LandingPage} />
                  <Route exact path="/postsearch" component={SearchFormExample} />
                  <Route exact path="/searchposts/:terms" component={SearchResultsExample} />
                  <Route exact path="/searchusers/:terms" component={SearchUsers} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    )
  }
}

ReactDOM.render(
  <App/>
, 
  
  document.getElementById("app")
  
  );
