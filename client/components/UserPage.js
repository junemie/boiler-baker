import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const UserHome = props => {
  return (
    <div>
      <h3>Welcome</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  };
};

export default connect(mapState)(UserHome);
