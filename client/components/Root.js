import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import store from "../store";
import { getMe } from "../store/users";
import UserPage from "./UserPage";
import Login from "./Login";

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
      <Switch>
        <Route path="/home" component={UserPage} />
        <Route component={Login} />
        {/* <Route path="/logout" component={}/> */}
      </Switch>
    );
  }
}

export default withRouter(Root);
