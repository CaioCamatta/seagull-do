import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import TaskPage from "./components/TaskPage";
import { data } from "./components/TempData";
import Settings from "./components/settings";

//For Darkseid
import "./style/darkMode.css";



// Pages for conditional rendering
export const TASK_PAGE = "TASK_PAGE";
export const SETTINGS_PAGE = "SETTINGS_PAGE";

function App() {
  let [page, setPage] = useState(TASK_PAGE);
  let [settings, setSettings] = useState(null);
  const [intialized, setInitialized] = useState(false);

  // Get settings from local storage
  const fetchSettings = () => {

    // Initialize settings if they don't exist.
    Settings.loadSettings();

    const seagull_do_settings = JSON.parse(
      localStorage.getItem("seagull_settings")
    );
    setSettings(seagull_do_settings);
  };

  useEffect(() => {
    fetchSettings();

    // Load test data into local storage for now
    if (!localStorage.getItem("task_data")) {
      localStorage.setItem("task_data", JSON.stringify(data));
    }

    setInitialized(true);
  }, []);

  if (!intialized) return <div />;

  if (page === TASK_PAGE) {
    return <TaskPage settings={settings} setPage={setPage} />;
  }

  if (page === SETTINGS_PAGE) {
    return <Settings onChange={fetchSettings} setPage={setPage} />;
  }

  return <div>PAGE NOT FOUND</div>;
}

export default App;
