import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import PublicServers from "./components/PublicServers";
import CreateServerForm from "./components/CreateServerForm";
import EditServerForm from "./components/EditServerForm";
import { authenticate } from "./store/session";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import UpdateChannel from "./components/UpdateChannel";
import Friends from "./components/Friends";
import Chat from "./components/chat";
import DeleteChannel from "./components/DeleteChannel";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/register">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          {/* <ServersBar isLoaded={isLoaded} /> */}
          <Route exact path="/servers">
            <PublicServers />
            {/* <CreateServerForm /> */}
          </Route>
          <Route exact path="/servers/:serverId">
            <EditServerForm />
          </Route>
          <Route exact path="/chat/message">
            <Chat />
          </Route>
          <Route exact path="/app">
            <Dashboard />
          </Route>
          {/* <Route exact path="/app/:user_id">
            <Dashboard />
          </Route> */}
          <Route exact path="/app/:server_id">
            <Dashboard />
          </Route>
          <Route exact path="/app/:server_id/:channel_id">
            <Dashboard />
          </Route>
          <Route exact path="/servers/create">
            <CreateServerForm />
          </Route>
          <Route exact path="/servers/:server_id/update">
            <EditServerForm />
          </Route>
          <Route exact path="/servers">
            <PublicServers />
          </Route>
          <Route exact path="/:server_id/:channel_id">
            <UpdateChannel />
          </Route>
          <Route exact path="/app/:server_id/:channel_id/delete">
            <DeleteChannel />
          </Route>
          <Route exact path="/:user_id/friends">
            <Friends />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
