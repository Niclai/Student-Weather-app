import React from 'react';
import { useState} from "react";
import { Text, View, TextInput, Button, Switch} from 'react-native';


export default function userPreferenceForm() {
  const [submitted, setSubmitted] = useState('');

  const [hayfever, sethayfever] = useState(false);
  const toggleSwitch = () => sethayfever(previousState=>!previousState)

  const [timesPerWeek, settimesPerWeek] = useState('');
  const [timesPerWeekERROR, settimesPerWeekERROR] = useState('');

  const [timeBeforeNotif, settimeBeforeNotif] = useState('');
  const [timeBeforeNotifERROR, settimeBeforeNotifERROR] = useState('');

  const [sessionDuration, setsessionDuration] = useState('');
  const [sessionDurationERROR, setsessionDurationERROR] = useState('');

  const [preferredMinTemp, setpreferredMinTemp] = useState('');
  const [preferredMinTempERROR, setpreferredMinTempERROR] = useState('');

  const [preferredMaxTemp, setpreferredMaxTemp] = useState('');
  const [preferredMaxTempERROR, setpreferredMaxTempERROR] = useState('');

  const [maxWindSpeed, setmaxWindSpeed] = useState('');
  const [maxWindSpeedERROR, setmaxWindSpeedERROR] = useState('');

  const [maxPollenLevels, setmaxPollenLevels] = useState('');
  const [maxPollenLevelsERROR, setmaxPollenLevelsERROR] = useState('');


const handleSubmit = () => {
      var timesPerWeekValid = false;    /*Error checking for amount of timesPerWeek*/
      if(timesPerWeek.length == 0){
        settimesPerWeekERROR("required");
      }                              
      else{
        settimesPerWeekERROR("")
        timesPerWeekValid = true
      }

      var timeBeforeNotifValid = false;    /*Error checking for timeBeforeNotication*/
      if(timeBeforeNotif.length == 0){
        settimeBeforeNotifERROR("required");
      }
      else if(parseInt(timeBeforeNotif) > 24){   
        settimeBeforeNotifERROR("Must be Less than 24");
      }                                 
      else{
        settimeBeforeNotifERROR("")
        timeBeforeNotifValid = true
      }

      var sessionDurationValid = false;    /*Error checking for session Duration*/
      if(sessionDuration.length == 0){
        settimeBeforeNotifERROR("required");
      }
      else if(parseInt(sessionDuration) > 24){   
        setsessionDurationERROR("Must be Less than 24");
      }                                 
      else{
        setsessionDurationERROR("")
        sessionDurationValid = true
      }

      var preferredMinTempValid = false;   /*Error checking for min temp*/
      if(preferredMinTemp.length == 0){
        setpreferredMinTempERROR("required");
      }                             
      else{
        setpreferredMinTempERROR("")
        preferredMinTempValid = true
      }
    
      var preferredMaxTempValid = false;   /*Error checking for max temp*/
      if(preferredMaxTemp.length == 0){
        setpreferredMaxTempERROR("required");
      }
      else if(parseInt(preferredMaxTemp) > 50){   
        setpreferredMaxTempERROR("Must be Less than 50");    
      }   
      else if(parseInt(preferredMaxTemp) <= parseInt(preferredMinTemp)){   
        setpreferredMaxTempERROR("Max must be greater then the minimum Preferred temperature");  
      }                                
      else{
        setpreferredMaxTempERROR("")
        preferredMaxTempValid = true
      }

      var maxWindSpeedValid = false;   /*Error checking for maxWindSpeed*/
      if(maxWindSpeed.length == 0){
        setmaxWindSpeed("5")
        maxWindSpeedValid = true
      }                              
      else{
        setmaxWindSpeedERROR("")
        maxWindSpeedValid = true
      }

      var maxPollenLevelsValid = false;   /*Error checking for maxPollenLevels*/
      if(hayfever == true){                              /*if hayfever was selected then check input should be valid*/ 
        if (maxPollenLevels.length == 0){
          setmaxPollenLevelsERROR("required");
        }
        else if(parseInt(maxPollenLevels) <= 0 || parseInt(maxPollenLevels) > 100){
          setmaxPollenLevelsERROR("levels must be between 0 and 100");
        }
        else{
          setmaxPollenLevelsERROR("")
          maxPollenLevelsValid = true
        }
      } 
      else{                                     /*if hayfever wasn't selected check to see that input is empty*/
        if (maxPollenLevels.length != 0){
          setmaxPollenLevelsERROR("can not enter here as hayfever hasn't been selected");
        }
        else{
          setmaxPollenLevelsERROR("")
          maxPollenLevelsValid = true
        }
      }                              
    
      if(timesPerWeekValid && timeBeforeNotifValid && sessionDurationValid && preferredMinTempValid && preferredMaxTempValid && maxWindSpeedValid && maxPollenLevelsValid ){ 

        /*todo save it somehow to external JSON file*/

        setSubmitted("Preferences Changed")
      }
      else{
        setSubmitted("")
      }       
  
    }
  return (
      <View>
          <View>
            <Text>Edit Preferences:</Text>
              <View>
                <Text>Do you have hay fever?</Text>
                <Switch 
                onValueChange={toggleSwitch}
                value={hayfever}
                />
              </View>
              <View>
                <Text>How Many times per week would you like to study outdoors?</Text>
                <TextInput keyboardType='numeric' onChangeText={val => settimesPerWeek(val)} value={timesPerWeek} />
              </View>
              {timesPerWeekERROR.length > 0 &&
          
                <Text>{timesPerWeekERROR}</Text>
              }

              <View>
                <Text>How long before your scheduled study session would you like to be notified (hours)? </Text>
                <TextInput keyboardType='numeric' onChangeText={val => settimeBeforeNotif(val)} value={timeBeforeNotif} />
              </View>
              {timeBeforeNotifERROR.length > 0 &&
          
                <Text>{timeBeforeNotifERROR}</Text>
              }

              <View>
                <Text>Preferred study session duration? (hours) </Text>
                <TextInput keyboardType='numeric' onChangeText={val => setsessionDuration(val)} value={sessionDuration} />
              </View>
              {sessionDurationERROR.length > 0 &&
          
                <Text>{sessionDurationERROR}</Text>
              }

              <View>
                <Text>Prefered minimum Temperature for outdoor study sessions (°c)</Text>
                <TextInput keyboardType='numeric' onChangeText={val => setpreferredMinTemp(val)} value={preferredMinTemp} />
              </View>
              {preferredMinTempERROR.length > 0 &&
          
                <Text>{preferredMinTempERROR}</Text>
              }

              <View>
                <Text>Prefered maximum Temperature for outdoor study sessions (°c)</Text>
                <TextInput keyboardType='numeric' onChangeText={val => setpreferredMaxTemp(val)} value={preferredMaxTemp} />
              </View>
              {preferredMaxTempERROR.length > 0 &&
          
                <Text>{preferredMaxTempERROR}</Text>
              }

              <View>
                <Text>Max wind speed? km/h</Text>
                <TextInput keyboardType='numeric' onChangeText={val => setmaxWindSpeed(val)} value={maxWindSpeed} />
              </View>
              {maxWindSpeedERROR.length > 0 &&
          
                <Text>{maxWindSpeedERROR}</Text>
              }

              <View>
                <Text>Maximum pollen levels for outdoor study session (%)</Text>
                <TextInput keyboardType='numeric' onChangeText={val => setmaxPollenLevels(val)} value={maxPollenLevels} />
              </View>
              {maxPollenLevelsERROR.length > 0 &&
          
                <Text>{maxPollenLevelsERROR}</Text>
              }

              <Button onPress={handleSubmit} title='Save changes' />
              <Text>{submitted}</Text>
</View>
      </View>
  )
}


