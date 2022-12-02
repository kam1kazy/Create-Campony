import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import "reset-css"
import "./fonts/fonts.css"
import "./index.css"

import { Provider } from "react-redux"
import { store } from "./redux"
import { ThemeProvider } from "@mui/material"
import { theme } from "./fonts/index"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
)
