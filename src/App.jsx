import React from "react";
import LandingPage from "./components/Main/component/LandingPage";
import usePersistScreenshotBlackout from "./components/Main/component/PreventScreenshot";
// screen blur prevented 
const App = () => {
  usePersistScreenshotBlackout();
  return (
    <div>
      <LandingPage/>
    </div>
  );
};

export default App;
