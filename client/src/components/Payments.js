import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    // to style the default stripecheckout button, we need to create a child element of <StripeCheckout /> 
    //    we add a button child element and change it from a self closing tag to a <StripeCheckout /> to 
      {/* <StripeCheckout> <StripeCheckout/> */}
    
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
