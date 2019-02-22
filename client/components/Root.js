import React, { Component } from "react";
import UserPage from "./UserPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { getMe } from "../store/users";
// const Root = () => {
//   return (
//     <div>
//       <UserPage />
//     </div>
//   );
// };

class Root extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await store.dispatch(getMe());
    this.props.history.push("/home");
  }
  render() {
    return (
      <div>
        <UserPage />
      </div>
    );
  }
}

export default withRouter(Root);
