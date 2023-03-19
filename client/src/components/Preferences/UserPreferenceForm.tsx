import React, { useContext } from "react";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Switch,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import { UserPreferencesContext } from "../../providers/UserPreferences";
import { Location } from "../../types/location";
import LocationSelect from "../Location/LocationSelect";

export default function UserPreferenceForm() {
  const { userPreferences, updateUserPreferences } = useContext(
    UserPreferencesContext
  );

  const [modalVisible, setModalVisible] = useState(false);

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

      console.log("SAVED");
      setModalVisible(true);
      setSubmitted("Preferences Changed");
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
      setSubmitted("");
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
      /*if hayfever wasn't selected check to see that input is empty*/
      // if (maxPollenLevels.length != 0) {
      //   setmaxPollenLevelsERROR(
      //     "can not enter here as hayfever hasn't been selected"
      //   );
      //   return false;
      // } else {
      //   setmaxPollenLevelsERROR("");
      //   return true;
      // }
    }
  };

  const components = [
    // <Text style={styles.title} key={0}>
    //   Edit Preferences:
    // </Text>,

    <LocationSelect
      key={1}
      location={location}
      setLocation={location => setLocation(location)}
    />,

    <View key={2}>
      {/* Fever */}
      <View style={styles.row}>
        <Text style={styles.label}>Do you have hay fever?</Text>
        <Switch onValueChange={showMaxPollenLevels} value={hayfever} />
      </View>
      {hayfever ==
        true /*show max pollen levels input box when hayfever is switched on (conditional rendering)*/ && (
        <View>
          <Text>Maximum pollen levels for outdoor study session (%)</Text>
          {maxPollenLevelsERROR.length > 0 && (
            <Text style={styles.errLabel}>{maxPollenLevelsERROR}</Text>
          )}
          <TextInput
            style={[
              styles.txtInput,
              maxPollenLevelsERROR.length > 0 && { borderColor: "red" },
            ]}
            keyboardType="numeric"
            autoFocus={false}
            onChangeText={val => setmaxPollenLevels(val)}
            value={maxPollenLevels}
          />
        </View>
      )}

      {/* Time to study per week */}
      <View>
        <Text>How Many times per week would you like to study outdoors?</Text>
        {timesPerWeekERROR.length > 0 && (
          <Text style={styles.errLabel}>{timesPerWeekERROR}</Text>
        )}
        <TextInput
          style={[
            styles.txtInput,
            timesPerWeekERROR.length > 0 && { borderColor: "red" },
          ]}
          keyboardType="numeric"
          onChangeText={val => settimesPerWeek(val)}
          value={timesPerWeek}
        />
      </View>

      {/* time before notif */}
      <View>
        <Text>
          How long before your scheduled study session would you like to be
          notified (hours)?{" "}
        </Text>
        {timeBeforeNotifERROR.length > 0 && (
          <Text style={styles.errLabel}>{timeBeforeNotifERROR}</Text>
        )}
        <TextInput
          style={[
            styles.txtInput,

            timeBeforeNotifERROR.length > 0 && { borderColor: "red" },
          ]}
          keyboardType="numeric"
          onChangeText={val => settimeBeforeNotif(val)}
          value={timeBeforeNotif}
        />
      </View>

      {/* study session */}

      <View>
        <Text>Preferred study session duration? (hours) </Text>
        {sessionDurationERROR.length > 0 && (
          <Text style={styles.errLabel}>{sessionDurationERROR}</Text>
        )}
        <TextInput
          style={[
            styles.txtInput,
            sessionDurationERROR.length > 0 && { borderColor: "red" },
          ]}
          keyboardType="numeric"
          onChangeText={val => setsessionDuration(val)}
          value={sessionDuration}
        />
      </View>

      {/* min temp */}
      <View>
        <Text>
          Prefered minimum Temperature for outdoor study sessions (°c)
        </Text>
        {preferredMinTempERROR.length > 0 && (
          <Text style={styles.errLabel}>{preferredMinTempERROR}</Text>
        )}
        <TextInput
          style={[
            styles.txtInput,
            preferredMinTempERROR.length > 0 && { borderColor: "red" },
          ]}
          keyboardType="numeric"
          onChangeText={val => setpreferredMinTemp(val)}
          value={preferredMinTemp}
        />
      </View>

      {/* max temp */}
      <View>
        <Text>
          Prefered maximum Temperature for outdoor study sessions (°c)
        </Text>
        {preferredMaxTempERROR.length > 0 && (
          <Text style={styles.errLabel}>{preferredMaxTempERROR}</Text>
        )}
        <TextInput
          style={[
            styles.txtInput,
            preferredMaxTempERROR.length > 0 && { borderColor: "red" },
          ]}
          keyboardType="numeric"
          onChangeText={val => setpreferredMaxTemp(val)}
          value={preferredMaxTemp}
        />
      </View>

      {/* Wind speed */}
      <View>
        <Text>Max wind speed? km/h</Text>
        {maxWindSpeedERROR.length > 0 && (
          <Text style={styles.errLabel}>{maxWindSpeedERROR}</Text>
        )}
        <TextInput
          style={[
            styles.txtInput,
            maxWindSpeedERROR.length > 0 && { borderColor: "red" },
          ]}
          keyboardType="numeric"
          onChangeText={val => setmaxWindSpeed(val)}
          value={maxWindSpeed}
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Button onPress={handleSubmit} title="Save changes" />
      </View>
    </View>,
  ];

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.popupWrapper}>
          <View style={styles.popupContent}>
            <Text style={styles.savedLabel}>Preferences Changed</Text>
            <View style={{ width: "70%" }}>
              <Button onPress={() => setModalVisible(false)} title="Close" />
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        style={styles.wrapper}
        data={components}
        keyboardShouldPersistTaps="handled"
        renderItem={item => item.item}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
  },
  txtInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#93cce7",
    marginTop: 4,
    marginBottom: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  errLabel: {
    color: "red",
  },

  popupWrapper: {
    backgroundColor: "#000000aa",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: 16,
    paddingVertical: 24,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
  },
  savedLabel: {
    fontSize: 24,
    marginBottom: 32,
  },
});
