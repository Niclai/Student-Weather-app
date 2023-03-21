import UserPreferenceForm from "../../components/Preferences/UserPreferenceForm";
import Navbar from "../../components/Navbar";

/**
 * Settings page for configuring user preferences
 */
const Settings = () => {
  return (
    <div>
      <Navbar type={2} />
      <UserPreferenceForm />
    </div>
  );
};

export default Settings;
