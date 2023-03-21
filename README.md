# ECS522-weather-app

### What is the project?
This project is a basic weather app with additional unique functions such as calculating the perfect time of day to study outside it
based of user preferences. This project is targeted towards helping students in their day-to-day life.


### Why is the project useful?
Developing this project brings huge benefits towards the large student community. Allowing them to gain more knowledge and insight to plan ahead for
their daily activities. It also provides notifications to when the best time of day to study outside is. 
Most students refrain from studying outside due to the uncertainty of the weather, but by providing real time updates and accurate notifications
this app should provide students with more confidence to do so. 

### How to download the app: 
....

### Running the application locally

**Note**: The following commands have been tested on Linux and MacOS. Windows
users may need to use different commands.

#### Prerequisites

Make sure [node.js](https://nodejs.org/en/download) and
[npm](https://www.npmjs.com/package/npm) is installed on your system.

#### Installing frontend dependencies

Inside the `client` directory, run the following command:

```bash
npm install
```

#### Running unit tests

To run the unit tests, run the following command:

```bash
npm test
```

#### Running application using Expo CLI

First, ensure the backend proxy server is running by following the steps in the
[server README](server/README.md).

Once you know the IP address and port of the backend server, you can start the
application using:

```
BASE_PROXY_URL=http://<server-ip>:<server-port> npm start
```

where `<server-ip>` and `<server-port>` should be replaced with the ones your
backend proxy server is running on.

A QR code should be displayed in your terminal, e.g.:

```
root@1bb0fa9d64ed:/home/client# BASE_PROXY_URL=http:192.168.1.57:5000 npm start

> weather-app@1.0.0 start
> expo start

Starting project at /home/client
Starting Metro Bundler
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █   █▄▀▀▄▀█ ▄▄▄▄▄ █
█ █   █ █ ▀▄ █▀▄ ▄█ █   █ █
█ █▄▄▄█ █▀██▀▀ ▀▄██ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄▀▄█ █▄█ █▄▄▄▄▄▄▄█
█  ██▄▄▄██▀▀▄▀▀▄ ▄██ ▀▄▄ ▄█
██ ▄ █ ▄ ██▀ ▄██ ▀▀  ▄  ▀██
█▀ ▄  ▄▄ ▄▀▄█▄▀▄▀▄▀▄▀▀▄ ▀██
███▀▀▀▄▄▄▀ ▀█▀██▄▄ ██▄ ▀███
█▄▄▄▄██▄▄ ▄ ▄▀▄ ▄ ▄▄▄ ▀ ▄▄█
█ ▄▄▄▄▄ █▀▄▀ ▄ ▄▀ █▄█ ▀▀███
█ █   █ █▄ ▄█▄ ▀█▄▄ ▄▄▀   █
█ █▄▄▄█ █▀███▀█▀▄▄▄ ▀█▀▀ ██
█▄▄▄▄▄▄▄█▄█▄▄█▄▄████▄▄▄▄▄▄█

› Metro waiting on exp://127.0.0.1:19000
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu

› Press ? │ show all commands
```

#### Launching application on a mobile device

Install [Expo Go](https://expo.dev/client) on your mobile device. Scan the QR
code provided by output of the `npm start` command in the previous step, using
the method corresponding to your device as described in the output above.

The application should now load on your mobile device and be ready for use.

### How to use the app:
When first using the app you are prompted to enter your desired weather
conditions for outdoor studying. This can be altered later on if needed. After
inputting conditions, the app will display the time of day when you can study
outside is. If there are unexpected weather changes, the app will recalculate
the time of day. To navigate the app there are simple buttons and screens that
allow for self-explanatory usage of all the different functions provided.

## Requirements

- [x] Your code MUST be properly commented – marks will be deducted if your code
  is not self-explanatory.
- [x] You MUST include a readme file with instructions of how to run your code
      (including how to install any dependencies or additional libraries) – if this is
      not provided, we will be unable to run your code and you will therefore receive
      ZERO marks for the implementation and any extensions.


|Id|Requirement|
|-|-|
|1 |Application must run on Android and iOS|
|2 |Application's interface must include english|
|3 |When the user first opens the app, they should be prompted to answer a few question to calibrate their experience|
|4 |The user should be allowed to later visit their settings and alter their personal questions|
|5 |The user should be allowed to export their preferences to JSON and import from JSON at any time, including during initial startup of the app|
|7 |Application should allow the user to use their **current location** for showing weather information and forecasts|
|8 |Application should allow user to enter a custom location for showing weather information and forecasts|
|9 |Application should allow user to store a list of saved locations, so they can easily switch between them|
|10|The application should display basic live weather stats (temperate, wind, percipitatoin, humidity) updated every 10 minutes|
|11|The application should display live pollen levels to the user pulled from an external API, if they have enabled this option|
|12|The application should display rainfall levels from the previous x hours, where x is a filter where the user can choose the time range|
|13|The application should allow the user to view hour by hour basic weather stats for the current day, as well as the upcoming 2 weeks|
|14|The application should allow the user to view a summarised forecast of each day for the next 2 weeks ahead|
|15|The application should schedule the optimal time to study outdoors based on the user's preferences (weather conditons + frequency)|
|16|The application should automatically reschedule optimal study time as soon as more up-to-date forecasts are available|
|17|The application should automatically reschedule optimal study time if the pollen levels are above a certain threshold|
|18|The user should be able to view the next 2 weeks ahead to see when the study times are currently scheduled|
|19|The user should be able to set constraints on the hours they are available to study outdoors on a day-by-day basis|
|20|The user should be able to set default constraints on the hours they are available to study outdoors for each day of the week (asked during startup process)|
|21|The application should deliver the user a push notification according to their selected frequency and time before recommended study|
|22|Current day forecasts update every 10 minutes, future days every 1 hour|


## Elaborated

|ID|Requirement|Type|
|--|------------|----|
|1 |Application must run on Android and iOS. By supporting all major mobile platforms, we can effectively reach the entirety of our primary stakeholders, who happen to all use a smartphone device running one of the two mentioned opterating systems. We have chosen the mobile marked due to our target users already using existing weather applications on their phones, which would make the switch to our app seamless.|Non-functional: Platform|
|2 |The application's interface languages must include English in the base application implementation. Many students around the world are familiar with this language, and it's also the language the developers use. By providing the base implementation in this language, the app can be translated to many other languages by other contributors.|Non-functional: Localisation|
|3 |When the user first opens the app, they should be prompted to answer a few question to calibrate their experience, including whether they have hay fever, how often they want to study outdoors, how long before the recommended outdoor time they want notifications to appear, the user's preferable weather condtions for outdoor study, including the minumim and maximum temperature, maximum windspeed (defaults to 5km/h), acceptable solar radiation ranges and acceptable pollen levels (if applicable). The user will also get the option to skip this step and start using the app straight away in which case, default settings will be used.|Functional|
|4 |The user should be allowed to later visit their settings and alter their personal questions they answered during set-up or to set-up for the first time if they skipped the step earlier; this will allow for a more personalised user experience and gives them the freedom to alter when they would like to be notified, how often and set the hay fever filter.|Functional|
|5 |The user should have the ability to export their preferences to JSON and later to import their preferences from JSON, including during initial startup of the app on another device. The main motivation behind this feature is the lack of user accounts managed on the backend. The user is responsible for managing their own preferences data. We can integrate this feature with the platfroms' native file sharing functionality to enable users to store this file in their cloud drives for convenience.|Functional|
|7 |The application should allow the user to use their current location for showing weather information and forecasts. This will allow them to quickly and easily set up the application for use. This feature will use the built-in GPS functionality that comes with nearly all mobile devices, by leveraging the native APIs.|Functional|
|8 |The applciation should also allow the user to select a custom location for showing weather information and forecasts. This will allow them to plan ahead for any travel they may undertake throughout the upcoming 2 weeks, as well as allowing users to use the application even when GPS coordinates are not available|Functional|
|9|The application should allow the user to store a list of saved locations, so they can easily switch between them. Many of our users will live in different places depending on the time of year (e.g. with family during the holidays). Being able to switch between saved locations allows for seamless transitions between work environments|Functional|
|10|The application should display basic live weather stats (temperate, levels of sunlight, wind speed, percipitatoin, humidity) on the main page. This information should updated every 10 minutes, provided there is an internet connection, so that it the information is reliable. This allows the user to conveniently access the most important information they need by simply launching the app.|Functional|
|11|The application should display live pollen levels to the user pulled from an external API. This would allow users to make informed decisions as to whether their hay fever would be triggered by going outdoors. The inclusion of this feature is justified by the large proportion of interviewed students who have hay fever. Pollen levels should only be displayed if the user opted into it during the setup process|Functional|
|12|The application should display rainfall levels from the previous x hours, where x is a parameter where the user can choose the time range. From this statistic we can inform our users how wet it is outside. This will proove useful to users that enjoy spending time in natural outdoor areas, where the wetness of the ground may impact their decision as to where to study.|Functional|
|13|The application should allow the user to view hour by hour basic weather stats (temperate, percipitation, wind speed, levels of sunlight) for the current day, as well as the upcoming 2 weeks. This meets the demand of the proportion of users that will use our weather app to plan their day(s) ahead of time|Functional|
|14|The application should allow the user to view a summarised forecast of each day for the next 2 weeks ahead, allowing users to get a quick overview of what to expect from outdoor conditions in the days to follow, without being bogged down by any unnecessary details|Functional|
|15|The application should schedule the optimal time to study outdoors based on the user's preferences. In particular, the neccessary condtion of the weather conditions specified by the user in their preferences must be met for a duration of at least 1 hour for a study session to be marked as a cadnidate for scheduling. From the candidate session elected, a sufficient number of them will actually be sceduled in order to satisfy as closely as possible the outdoor study frequency configured by the user.|Functional|
|16|The application should automatically reschedule optimal study time as soon as more up-to-date forecasts are available. This means that every time new weather forecasts are pulled, the scheduling algorithm will be re-run. This is to ensure the shcheduling is as accurate as possible and has a high probability of meeting the user's set frequency of study, even with rapidly changing forecasts|Functional
|17|The application should automatically reschedule optimal study time if the pollen levels are above a certain threshold, that was set by the user. This would ensure that the app will only suggest our users to study outdoors when the pollen levels would not be detrimental to their health and comfort.|Functional|
|18|The user should be able to view the next 2 weeks ahead to see when the study times are currently scheduled. This will allow users to get a sense of how the app works and what can be expected of the next few days in terms of conditons for outdoor study.|Functional|
|19|The user should be able to set constraints on the hours they are available to study outdoors on a day-by-day basis for the upcoming 2 weeks. If a study session was scheduled outside these hours set, it will be rescheduled and no more sessions will be scheduled outside of these hours. These constraints will override the default weekly study hours.|Functional|
|20|The user should be able to set default constraints on the hours they are available to study outdoors for each day of the week. This will be asked during startup process and can be reconfigured at any time. Study sessions will be scheduled to meet these constraints set by the user.|Functional|
|21|The application should deliver the user a push notification according to their selected frequency and time before recommended study (defaults if not set are once a day and 1 hour before) with information of the best time that day for outdoor study. This will remind the user of their schedules outdoor study time.| Functional|
|22|For the current day, the forecasts should be checked and updated every 10 minutes, and for future days forecasts should be checked and updated every 1 hour, assuming the user is connected to the internet. Updating the forecasts frequently will ensure the user gets the most reliable data available, which matters to our target audience.|Functional|
|23| The application must not be running 24/7. By allowing the app to run throughout the entire day, it will diminish the user's phone battery life as this app is not necessary to be active the entire day. This is because it is unlikely for the user to be studying out at night, or early in the morning where pollen levels may be high, so the app should only run when the user opens it. | Non-functional: Resource Constraints |
|24| The application should have a fast response time from the user interacting with the app. The application should load the relevant weather information sought out by the user within 1 second from the user's interaction with the app. The application should load within 3 seconds from the user opening the app.| Non-functional: Performance |
|25| The application shall be accessible by people who are colour blind, to the extent that it should be easy to discern all text and other information displayed by the system as easily as a person without colour blindness. | Non-functional: Accessibility |
|26| The application should be accessible to users at least 95% of the time without failure - this includes crashes, application not starting correctly. | Non-functional: Reliability |
|27| All user data should be stored locally on the user's device, meaning that we do not collect user data in any way. This ensures that we automatically adhere to any data protection laws, as we do not store any user data ourselves. Our users can rest assured that their data is kept private and not sent to any servers|Non-functional: Privacy|
|28| The application should have an intuitive layout and design to enable the user to easily navigate its interface and easily determine what a feature is and what it can do. | Non-functional: Usability |
