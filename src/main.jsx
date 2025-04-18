import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import "./utils/i18n";
import { store } from "./redux/store";
import { Provider } from "react-redux";

// Styles
//import "yet-another-react-lightbox/styles.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  </Provider>
);
