//we now use 'import' rather that 'require' like on node or express
//because on the front end we are making use of Babel and Webpack which gives us very easy access to es2015 modules
//where as on the backend nodejs only has support for common js modules
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';


import Header from "./Header";
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      // always good when working with materialize or bootstrap to have the main div have a classname Container.
      // this materialize and bootstrap assume this so without it the elements are right up against the edge of the screen
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
