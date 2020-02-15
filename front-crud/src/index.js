import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Header from "./Header";
import Adicionar from "./pages/Adicionar";
import Listar from "./pages/Listar";
import Editar from "./pages/Editar";

ReactDOM.render(
  <Router>
    <Header />
    <Route exact path="/" component={Listar} />
    <Route path="/add" component={Adicionar} />
    <Route path="/editar/:id" component={Editar} />
  </Router>,
  document.getElementById("root")
);
