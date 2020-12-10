import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

import Alerts from './layout/Alerts';
import RegistrationForm from "./registration/RegistrationForm2";
import LoginForm from "./login/LoginForm2";
// import User from "./user/User";
import PrivateRoute from "./common/PrivateRoute";
import ForgotCredentialsForm from "./login/ForgotCredentialsForm2";
import HomePage from "./layout/HomePage2";
import UserTimeline from "./layout/UserTimeline2"
import UserPostForm from "./posts/UserPostForm"
import Logout from "./user/Logout"
import UserPostView from './posts/UserPostView';

// import './darkMode.css'
// import('./myStyles.css')


import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import UserProfile from "./user/UserProfile2";
import ArbitraryUserProfile from "./user/ArbitraryUserProfile2";
import PrivacyPage from "./privacy/PrivacyPage";
import CreatePageForm from "./pages/CreatePageForm"
import Page from "./pages/Page"
import LandingPage from "./landing/LandingPage2";
import MyPages from "./pages/MyPages"
import SearchFormExample from "./searches/SearchFormExample";
import SearchResultsExample from "./searches/SearchResultsExample";
import SearchUsers from "./searches/SearchUsers";
import SearchPages from "./searches/SearchPages";

import PaymentPortal from "./payment/PaymentPortal";
import ThemeSelector from "./themes/ThemeSelector2";
import Chat from './messages/Chat';
import { ThemeProvider } from '@livechat/ui-kit'
import { Marketplace } from "./payment/Marketplace";

import { withStyles } from '@material-ui/core/styles';
import { CssBaseline, CssBaseling } from '@material-ui/core';
import { ComplexGrid } from "./payment/MarketItem";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

const useStyles = (theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: "url(../../static/images/background.jpg)",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  altBackground: {
    minHeight: '100vh',
    backgroundImage: "url(../../static/images/galaxy.jpg)",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }
});

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const { classes } = this.props
    const state = store.getState();

    
    
    return (
      <div>
        <ThemeProvider>
          <CssBaseline />
          <Provider store={store}>
            <ThemeSelector>
            {/* <ThemeSelector> */}
            <AlertProvider template={AlertTemplate} {...alertOptions}>
              <Router>
                <Fragment>
                  <Alerts />
                  <div className="container">
                    <Switch>
                      <PrivateRoute exact path="/" component={HomePage} />
                      <PrivateRoute exact path="/settings" component={PrivacyPage} />
                      <PrivateRoute exact path="/pages" component={MyPages} />
                      <PrivateRoute exact path="/profile/:username" component={ArbitraryUserProfile} />
                      <PrivateRoute exact path="/profile" component={UserProfile} />
                      <Route exact path="/register" component={RegistrationForm} />
                      <Route exact path="/login" component={LoginForm} />
                      <Route exact path="/forgot" component={ForgotCredentialsForm} />
                      <Route exact path="/users/:username" component={UserTimeline} />
                      <PrivateRoute exact path="/createpost" component={UserPostForm} />
                      <PrivateRoute exact path="/logout" component={Logout} />
                      <PrivateRoute exact path="/pages/create" component={CreatePageForm} />
                      <Route exact path="/pages/:pageID" component={Page} />
                      <Route exact path="/landing" component={LandingPage} />
                      <PrivateRoute exact path="/payment/:item_id" component={PaymentPortal} />
                      <PrivateRoute exact path="/marketplace" component={Marketplace} />
                      <Route exact path="/postsearch" component={SearchFormExample} />
                      <Route exact path="/searchposts/:terms" component={SearchResultsExample} />
                      <Route exact path="/posts/:post_id" component={UserPostView} />
                      <PrivateRoute exact path="/messages" component={Chat} />
                      <Route exact path="/searchusers/:terms" component={SearchUsers} />
                      <Route exact path="/searchpages/:terms" component={SearchPages} />
                      <Route exact path="/test/" component={ComplexGrid}/>
                    </Switch>
                  </div>
                </Fragment>
              </Router>
            </AlertProvider>
            </ThemeSelector>
          </Provider>
        </ThemeProvider>
      </div >
    )
  }
}

export default withStyles(useStyles)(App)