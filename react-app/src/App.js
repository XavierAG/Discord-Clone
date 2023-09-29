import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import PublicServers from "./components/PublicServers";
import CreateServerForm from "./components/CreateServerForm";
import EditServerForm from "./components/EditServerForm";
import { authenticate } from "./store/session";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import ServerSearch from "./components/ServerSearch";
import UpdateChannel from "./components/UpdateChannel";
import Friends from "./components/Friends";
import Chat from "./components/chat";
// import Navigation from "./components/Navigation";
// import ChannelBar from "./components/ChannelList";
// import ServersBar from "./components/ServersBar";
// import ChannelMessages from "./components/ChannelMessages";
// import WebSockets from "./components/WebSockets";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // console.log("USER STATE:", sessionUser);
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
            <CreateServerForm />
            <ServerSearch />
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
          <Route exact path="/:channel_id">
            <UpdateChannel />
          </Route>
          <Route exact path="/:id/friends">
            <Friends />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
