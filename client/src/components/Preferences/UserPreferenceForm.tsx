import React, { useContext } from "react";
import { useState } from "react";
import { UserPreferencesContext } from "../../providers/UserPreferences";
import { Location } from "../../types/location";
import LocationSelect from "../Location/LocationSelect";
import Modal from "react-modal";

import "./UserPreferencesForm.css";

export default function UserPreferenceForm() {
  const { userPreferences, updateUserPreferences } = useContext(
    UserPreferencesContext
  );

  const [modalVisible, setModalVisible] = useState(false);

  const [location, setLocation] = useState<Location | undefined>(
    userPreferences?.location
  );

  const [hayfever, sethayfever] = useState<boolean>(
    userPreferences?.hayFever ?? false
  );

  const [timesPerWeek, settimesPerWeek] = useState<string>(
    userPreferences?.timesPerWeek?.toString() ?? ""
  );
  const [timesPerWeekERROR, settimesPerWeekERROR] = useState("");

  const [timeBeforeNotif, settimeBeforeNotif] = useState<string>(
    userPreferences?.timeBeforeNotif?.toString() ?? ""
  );
  const [timeBeforeNotifERROR, settimeBeforeNotifERROR] = useState("");

  const [sessionDuration, setsessionDuration] = useState<string>(
    userPreferences?.sessionDuration?.toString() ?? ""
  );
  const [sessionDurationERROR, setsessionDurationERROR] = useState("");

  const [preferredMinTemp, setpreferredMinTemp] = useState<string>(
    userPreferences?.preferredMinTemp?.toString() ?? ""
  );
  const [preferredMinTempERROR, setpreferredMinTempERROR] = useState("");

  const [preferredMaxTemp, setpreferredMaxTemp] = useState<string>(
    userPreferences?.preferredMaxTemp?.toString() ?? ""
  );
  const [preferredMaxTempERROR, setpreferredMaxTempERROR] = useState("");

  const [maxWindSpeed, setmaxWindSpeed] = useState<string>(
    userPreferences?.maxWindSpeed?.toString() ?? ""
  );
  const [maxWindSpeedERROR, setmaxWindSpeedERROR] = useState("");

  const [maxPollenLevels, setmaxPollenLevels] = useState<string>(
    userPreferences?.maxPollenLevels?.toString() ?? ""
  );
  const [maxPollenLevelsERROR, setmaxPollenLevelsERROR] = useState("");

  const showMaxPollenLevels = () => {
    sethayfever(previousState => !previousState);
  };

  const handleSubmit = () => {
    const timesPerWeekValid = isPerWeekValid();

    const timeBeforeNotifValid = isTimeBeforeNotifValid();

    const sessionDurationValid = isSessionDurationValid();

    const preferredMinTempValid = isPreferredMinTempValid();

    const preferredMaxTempValid = isPreferredMaxTempValid();

    const maxWindSpeedValid = isMaxWindSpeedValid();

    const maxPollenLevelsValid = isMaxPollenLevelsValid();

    if (
      timesPerWeekValid &&
      timeBeforeNotifValid &&
      sessionDurationValid &&
      preferredMinTempValid &&
      preferredMaxTempValid &&
      maxWindSpeedValid &&
      maxPollenLevelsValid
    ) {
      updateUserPreferences({
        hayFever: hayfever,
        timesPerWeek: parseInt(timesPerWeek),
        timeBeforeNotif: parseInt(timeBeforeNotif),
        sessionDuration: parseInt(sessionDuration),
        preferredMinTemp: parseFloat(preferredMinTemp),
        preferredMaxTemp: parseFloat(preferredMaxTemp),
        maxWindSpeed: parseFloat(maxWindSpeed),
        maxPollenLevels: parseFloat(maxPollenLevels || "100"),
        location,
      });

      console.log("SAVED");
      setModalVisible(true);
    } else {
      console.log(
        timesPerWeekValid,
        timeBeforeNotifValid,
        sessionDurationValid,
        preferredMinTempValid,
        preferredMaxTempValid,
        maxWindSpeedValid,
        maxPollenLevelsValid
      );
      setModalVisible(false);
    }
  };

  const isPerWeekValid = () => {
    /*Error checking for amount of timesPerWeek*/
    if (timesPerWeek.length == 0) {
      settimesPerWeekERROR("required");
      return false;
    } else {
      settimesPerWeekERROR("");
      return true;
    }
  };

  const isTimeBeforeNotifValid = () => {
    /*Error checking for timeBeforeNotication*/
    if (timeBeforeNotif.length == 0) {
      settimeBeforeNotifERROR("required");
      return false;
    } else if (parseInt(timeBeforeNotif) > 24) {
      settimeBeforeNotifERROR("Must be Less than 24");
      return false;
    } else {
      settimeBeforeNotifERROR("");
      return true;
    }
  };

  const isSessionDurationValid = () => {
    /*Error checking for session Duration*/
    if (sessionDuration.length == 0) {
      setsessionDurationERROR("required");
      return false;
    } else if (parseInt(sessionDuration) > 24) {
      setsessionDurationERROR("Must be Less than 24");
      return false;
    } else {
      setsessionDurationERROR("");
      return true;
    }
  };

  const isPreferredMinTempValid = () => {
    /*Error checking for min temp*/
    if (preferredMinTemp.length == 0) {
      setpreferredMinTempERROR("required");
      return false;
    } else {
      setpreferredMinTempERROR("");
      return true;
    }
  };

  const isPreferredMaxTempValid = () => {
    /*Error checking for max temp*/
    if (preferredMaxTemp.length == 0) {
      setpreferredMaxTempERROR("required");
    } else if (parseInt(preferredMaxTemp) > 50) {
      setpreferredMaxTempERROR("Must be Less than 50");
    } else if (parseInt(preferredMaxTemp) <= parseInt(preferredMinTemp)) {
      setpreferredMaxTempERROR(
        "Max must be greater then the minimum Preferred temperature"
      );
    } else {
      setpreferredMaxTempERROR("");
      return true;
    }
  };

  const isMaxWindSpeedValid = () => {
    /*Error checking for maxWindSpeed*/
    if (maxWindSpeed.length == 0) {
      setmaxWindSpeed("5");
      return true;
    } else {
      setmaxWindSpeedERROR("");
      return true;
    }
  };

  const isMaxPollenLevelsValid = () => {
    /*Error checking for maxPollenLevels*/
    if (hayfever == true) {
      /*if hayfever was selected then check input should be valid*/
      if (maxPollenLevels.length == 0) {
        setmaxPollenLevelsERROR("required");
        return false;
      } else if (
        parseInt(maxPollenLevels) <= 0 ||
        parseInt(maxPollenLevels) > 100
      ) {
        setmaxPollenLevelsERROR("levels must be between 0 and 100");
        return false;
      } else {
        setmaxPollenLevelsERROR("");
        return true;
      }
    } else {
      return true;
    }
  };

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <div className="popupWrapper">
          <div className="popupContent">
            <p className="savedLabel">Preferences Changed</p>
            <div style={{ width: "70%" }}>
              <button onClick={() => setModalVisible(false)}>Close</button>
            </div>
          </div>
        </div>
      </Modal>
      <div>
        <div>
          <LocationSelect
            location={location}
            setLocation={location => setLocation(location)}
          />
        </div>
        {/* Fever */}
        <div className="row">
          <p className="label">Do you have hay fever?</p>
          <input
            type="checkbox"
            onChange={showMaxPollenLevels}
            checked={hayfever}
          />
        </div>
        {hayfever ==
          true /*show max pollen levels input box when hayfever is switched on (conditional rendering)*/ && (
          <div>
            <p>Maximum pollen levels for outdoor study session (%)</p>
            {maxPollenLevelsERROR.length > 0 && (
              <p className="errLabel">{maxPollenLevelsERROR}</p>
            )}
            <input
              className={`txtInput${
                maxPollenLevelsERROR.length > 0 ? " redBorder" : ""
              }`}
              type="numeric"
              autoFocus={false}
              onChange={e => setmaxPollenLevels(e.target.value)}
              value={maxPollenLevels}
            />
          </div>
        )}

        {/* Time to study per week */}
        <div>
          {/* TODO change to use labels */}
          <p>How Many times per week would you like to study outdoors?</p>
          {timesPerWeekERROR.length > 0 && (
            <p className="errLabel">{timesPerWeekERROR}</p>
          )}
          <input
            className={`txtInput${
              timesPerWeekERROR.length > 0 ? " redBorder" : ""
            }`}
            type="numeric"
            onChange={e => settimesPerWeek(e.target.value)}
            value={timesPerWeek}
          />
        </div>

        {/* time before notif */}
        <div>
          <p>
            How long before your scheduled study session would you like to be
            notified (hours)?{" "}
          </p>
          {timeBeforeNotifERROR.length > 0 && (
            <p className="errLabel">{timeBeforeNotifERROR}</p>
          )}
          <input
            className={`txtInput${
              timeBeforeNotifERROR.length > 0 ? " redBorder" : ""
            }`}
            type="numeric"
            onChange={e => settimeBeforeNotif(e.target.value)}
            value={timeBeforeNotif}
          />
        </div>

        {/* study session */}

        <div>
          <p>Preferred study session duration? (hours) </p>
          {sessionDurationERROR.length > 0 && (
            <p className="errLabel">{sessionDurationERROR}</p>
          )}
          <input
            className={`txtInput${
              sessionDurationERROR.length > 0 ? " redBorder" : ""
            }`}
            type="numeric"
            onChange={e => setsessionDuration(e.target.value)}
            value={sessionDuration}
          />
        </div>

        {/* min temp */}
        <div>
          <p>Prefered minimum Temperature for outdoor study sessions (°c)</p>
          {preferredMinTempERROR.length > 0 && (
            <p className="errLabel">{preferredMinTempERROR}</p>
          )}
          <input
            className={`txtInput${
              preferredMinTempERROR.length > 0 ? " redBorder" : ""
            }`}
            type="numeric"
            onChange={e => setpreferredMinTemp(e.target.value)}
            value={preferredMinTemp}
          />
        </div>

        {/* max temp */}
        <div>
          <p>Prefered maximum Temperature for outdoor study sessions (°c)</p>
          {preferredMaxTempERROR.length > 0 && (
            <p className="errLabel">{preferredMaxTempERROR}</p>
          )}
          <input
            className={`txtInput${
              preferredMaxTempERROR.length > 0 ? " redBorder" : ""
            }`}
            type="numeric"
            onChange={e => setpreferredMaxTemp(e.target.value)}
            value={preferredMaxTemp}
          />
        </div>

        {/* Wind speed */}
        <div>
          <p>Max wind speed? km/h</p>
          {maxWindSpeedERROR.length > 0 && (
            <p className="errLabel">{maxWindSpeedERROR}</p>
          )}
          <input
            className={`txtInput${
              maxWindSpeedERROR.length > 0 ? " redBorder" : ""
            }`}
            type="numeric"
            onChange={e => setmaxWindSpeed(e.target.value)}
            value={maxWindSpeed}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <button onClick={handleSubmit}>Save changes</button>
        </div>
      </div>
    </>
  );
}
