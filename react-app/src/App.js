import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import PublicServers from "./components/PublicServers";
import CreateServerForm from "./components/CreateServerForm";
import EditServerForm from "./components/EditServerForm";
import { authenticate } from "./store/session";
// import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
// import WebSockets from "./components/WebSockets";

function App() {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.session.user);
  console.log('USER STATE:', userState);
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
      <Route exact path='/servers/create'>
        <CreateServerForm />
      </Route>
      <Route exact path='/servers/:id/update'>
        <EditServerForm />
      </Route>
      <Route exact path="/servers">
        <PublicServers />
      </Route>
    </Switch>
  )

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
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
      )}
    </>
  );
}

export default App;
