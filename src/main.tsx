import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

//  const test = (
//   <div className="item">
//   <a href="https://google.com">test</a>
// </div>
// )

// const test = React.createElement(
//   "div",
//   { className: "item" },
//   React.createElement(
//     "a",
//     { href: "https://example.com", target: "_blank" },
//     "link"
//   )
// )

// createRoot(document.getElementById("root")!).render(test)
