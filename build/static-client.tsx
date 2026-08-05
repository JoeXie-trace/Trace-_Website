import { hydrateRoot } from "react-dom/client";
import Home from "../app/page";

const root = document.getElementById("root");

if (root) {
  hydrateRoot(root, <Home />);
}
