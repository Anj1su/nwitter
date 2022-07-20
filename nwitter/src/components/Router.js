import React from "react";

import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? ( 
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser}/>
            </Route>
          </div>
          ) : (
            <Route path="/">
              <Auth />
            </Route>
        )}
        </Switch>
    </Router>
  );
};
export default AppRouter;