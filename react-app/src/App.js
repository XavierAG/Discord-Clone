import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import PublicServers from "./components/PublicServers";
import { authenticate } from "./store/session";
// import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
// import WebSockets from "./components/WebSockets";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  console.log('USER STATE:', sessionUser);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const unauthorized = (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/servers">
        <PublicServers />
      </Route>
    </Switch>
  )

  const authorized = (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route exact path="/servers">
        <PublicServers />
      </Route>
    </Switch>
  )

  return (
    <>
      {isLoaded &&
        !sessionUser &&
        unauthorized}
      {isLoaded &&
        sessionUser &&
        authorized}
    </>
  );
}

export default App;
