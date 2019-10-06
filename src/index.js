import React from "react";
import ReactDOM from "react-dom";
import { App } from "./ui/App.jsx";
import registerServiceWorker from "./registerServiceWorker";
import "./setupProxy";
import { initializeMap, addRoutesToMap } from "./MapHelpers";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
initializeMap();
addRoutesToMap();
