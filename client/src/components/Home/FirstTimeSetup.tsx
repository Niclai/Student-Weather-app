import { FC, useState } from "react";
import UserPreferenceForm from "../Preferences/UserPreferenceForm";

import "./FirstTimeSetup.css";

/**
 * Component to be displayed for the user to perform the initial configuration
 * to allow the weather forecasting and scheduling functionality to work
 * correctly
 */
const FirstTimeSetup: FC = () => {
  const [state, setState] = useState(0);

  return (
    <div className="wrapper">
      {state === 0 ? (
        <div className="introCon">
          <p className="introTxt">
            Welcome! Complete the startup configuration so we can tailor the
            application to your needs
          </p>
          <button onClick={() => setState(1)} title="Continue" />
        </div>
      ) : (
        <UserPreferenceForm />
      )}
    </div>
  );
};

export default FirstTimeSetup;
