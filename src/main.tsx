import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Providers from "./Providers.tsx";

import "./index.css";
import "./css/global.styles.css";
import "./css/form.styles.css";
import "./css/nav.styles.css";
import "./css/footer.styles.css";
import "./css/project.styles.css";
import "./css/milestone.styles.css";
import "./css/task.styles.css";
import "./css/comment.styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers />
  </StrictMode>
);
