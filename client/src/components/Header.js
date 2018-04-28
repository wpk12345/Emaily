import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

//make sure to change out/delete the inline style when finishing css

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="3" style={{ margin: '0 10px' }}>Credits: {this.props.auth.credits}</li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          {/* turnary expression---a turnary expression exists by placing some type of boolean logic(something truthy or falsy 
ex. "this.props.auth"  it's asking 'Does this.props.auth exist?') then a '?' then the value we want to return if 
true '/surveys' then a ':' then the value to return if the boolean is falsey '/'   */}
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left-brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
