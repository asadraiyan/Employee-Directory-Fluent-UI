/// <reference types="vite/client" />
import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { Provider } from "react-redux";
import {
  FluentProvider,
  createLightTheme,
  createDarkTheme,
  type Theme,
} from "@fluentui/react-components";
import App from "./app/App";
import { store } from "./app/store";
import { brandRamp } from "./appConstant/theme";
import "./app/App.css";

const lightTheme = createLightTheme(brandRamp);
const darkTheme = createDarkTheme(brandRamp);

function ThemedApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme: Theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <FluentProvider theme={theme}>
      <App
        isDarkMode={isDarkMode}
        onThemeChange={setIsDarkMode}
      />
    </FluentProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  </React.StrictMode>
);
