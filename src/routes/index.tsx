import React from "react";
import { Switch, Route } from "react-router-dom";
import Artists from "../pages/Artists";
import HomePage from "../pages/HomePage";
import Movies from "../pages/Movies";
import Series from "../pages/Series";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route exact path="/movies" component={Movies} />
      <Route exact path="/series" component={Series} />
      <Route exact path="/artists" component={Artists} />
    </Switch>
  );
};

export default Routes;
