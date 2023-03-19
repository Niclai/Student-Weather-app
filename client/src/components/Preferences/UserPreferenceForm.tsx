import React, { useContext } from "react";
import { useState } from "react";
import { Text, View, TextInput, Button, Switch, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserPreferencesContext } from "../../providers/UserPreferences";
import { Location } from "../../types/location";
import LocationSelect from "../Location/LocationSelect";

export default function UserPreferenceForm() {
  const { userPreferences, updateUserPreferences } = useContext(
    UserPreferencesContext
  );

  const [submitted, setSubmitted] = useState("");

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

      setSubmitted("Preferences Changed");
    } else {
      setSubmitted("");
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
      settimeBeforeNotifERROR("required");
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
      /*if hayfever wasn't selected check to see that input is empty*/
      if (maxPollenLevels.length != 0) {
        setmaxPollenLevelsERROR(
          "can not enter here as hayfever hasn't been selected"
        );
        return false;
      } else {
        setmaxPollenLevelsERROR("");
        return true;
      }
    }
  };

  const components = [
    <Text>Edit Preferences:</Text>,

    <LocationSelect
      location={location}
      setLocation={location => setLocation(location)}
    />,

    <View>
      <View>
        <Text>Do you have hay fever?</Text>
        <Switch onValueChange={showMaxPollenLevels} value={hayfever} />
      </View>
      {hayfever ==
        true /*show max pollen levels input box when hayfever is switched on (conditional rendering)*/ && (
        <View>
          <Text>Maximum pollen levels for outdoor study session (%)</Text>
          <TextInput
            keyboardType="numeric"
            autoFocus={false}
            onChangeText={val => setmaxPollenLevels(val)}
            value={maxPollenLevels}
          />
          {maxPollenLevelsERROR.length > 0 && (
            <Text>{maxPollenLevelsERROR}</Text>
          )}
        </View>
      )}

      <View>
        <Text>How Many times per week would you like to study outdoors?</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={val => settimesPerWeek(val)}
          value={timesPerWeek}
        />
        {timesPerWeekERROR.length > 0 && <Text>{timesPerWeekERROR}</Text>}
      </View>

      <View>
        <Text>
          How long before your scheduled study session would you like to be
          notified (hours)?{" "}
        </Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={val => settimeBeforeNotif(val)}
          value={timeBeforeNotif}
        />
        {timeBeforeNotifERROR.length > 0 && <Text>{timeBeforeNotifERROR}</Text>}
      </View>

      <View>
        <Text>Preferred study session duration? (hours) </Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={val => setsessionDuration(val)}
          value={sessionDuration}
        />
        {sessionDurationERROR.length > 0 && <Text>{sessionDurationERROR}</Text>}
      </View>

      <View>
        <Text>
          Prefered minimum Temperature for outdoor study sessions (°c)
        </Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={val => setpreferredMinTemp(val)}
          value={preferredMinTemp}
        />
        {preferredMinTempERROR.length > 0 && (
          <Text>{preferredMinTempERROR}</Text>
        )}
      </View>

      <View>
        <Text>
          Prefered maximum Temperature for outdoor study sessions (°c)
        </Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={val => setpreferredMaxTemp(val)}
          value={preferredMaxTemp}
        />
        {preferredMaxTempERROR.length > 0 && (
          <Text>{preferredMaxTempERROR}</Text>
        )}
      </View>

      <View>
        <Text>Max wind speed? km/h</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={val => setmaxWindSpeed(val)}
          value={maxWindSpeed}
        />
        {maxWindSpeedERROR.length > 0 && <Text>{maxWindSpeedERROR}</Text>}
      </View>

      <Button onPress={handleSubmit} title="Save changes" />
      <Text>{submitted}</Text>
    </View>,
  ];

  return (
    <FlatList
      data={components}
      keyboardShouldPersistTaps="handled"
      renderItem={item => item.item}
    />
  );
}
