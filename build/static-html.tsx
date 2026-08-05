import { renderToStaticMarkup } from "react-dom/server";
import Home from "../app/page";

export function renderPage() {
  return renderToStaticMarkup(<Home />);
}
