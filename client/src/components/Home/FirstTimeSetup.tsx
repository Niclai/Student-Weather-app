import { FC, useState } from "react";
import UserPreferenceForm from "../Preferences/UserPreferenceForm";

import styles from "./FirstTimeSetup.module.scss";

/**
 * Component to be displayed for the user to perform the initial configuration
 * to allow the weather forecasting and scheduling functionality to work
 * correctly
 */
const FirstTimeSetup: FC = () => {
  const [state, setState] = useState(0);

  return (
    <div className={styles.firstTimeSetup}>
      {state === 0 ? (
        <div className={styles.introCon}>
          <p className={styles.introTxt}>
            Welcome! Complete the startup configuration so we can tailor the
            application to your needs
          </p>
          <button onClick={() => setState(1)}>Continue</button>
        </div>
      ) : (
        <UserPreferenceForm />
      )}
    </div>
  );
};

export default FirstTimeSetup;
