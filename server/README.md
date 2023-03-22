# Weather App Proxy Backend Server

The purpose of this backend application is to serve as a proxy between the
frontend application and the public APIs that require API keys. The [React Native docs](https://reactnative.dev/docs/security#storing-sensitive-info) say:

> Never store sensitive API keys in your app code.

and they go on to recommend putting a layer between the API and the React
application, which is exactly what this backend service intends to achieve.

## Obtaining necessary API keys

### Google Maps

1. Navigate to the [Google Maps Platform](https://mapsplatform.google.com/)
   in your browser.
   ![](docs/screenshots/gmaps-api-step1.png)
2. Click the `Get started` button and log in with your Google account (or create
   one if you don't already have one)
3. Fill out your billing information. You will need to provide your credit card
   details. Google, as of time of writing, provides $200 monthly credit at no
   charge for Google Maps APIs, so you should not be charged anything as long
   as you don't exceed the free quota.
   ![](docs/screenshots/gmaps-api-step2.png)
4. Go back to the [Google Maps Platform Cloud Console](https://console.cloud.google.com/google/maps-apis/)
   and create a new Project.
   ![](docs/screenshots/gmaps-api-step3.png)
5. You should now see an API key modal, copy the API key to a safe place, and
   click the `Go to Google Maps Platform` button.
   ![](docs/screenshots/gmaps-api-step5.png)
6. Select the `No API restriction` option.
   ![](docs/screenshots/gmaps-api-step6.png)

Your Google Maps API key should now be ready to use.

## Running the server locally

### Prerequisites

You must have [Python 3](https://www.python.org/downloads/) version 3.7 or newer installed on your system

### Create a virtual environment

Inside this directory, run

```bash
python3 -m venv venv
. venv/bin/activate
```

### Installing dependencies

Inside this directory, run

```
pip3 install -r requirements.txt
```

### Running the server

Inside this directory, run

```
GMAPS_API_KEY=<your-google-maps-api-key> python3 -m flask run -h 0.0.0.0
```

where `<your-google-maps-api-key>` is the Google Maps API key you obtained in the previous step.

Setting the host to `0.0.0.0` will expose your server on IPv4 addresses assigned to your machine, meaning you can connect to the server from other devices on the same network. The port will default to 5000, but if that is already taken by another program, change the port number to something else with the `-p <port-number>` flag appended to the end of the above command.

You should see output similar to the following:

```
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://192.168.1.57:5000
```

The output includes the IP address and port the application is exposed on.
You will need this to connect the frontend application to the server.

In the example, the server can be accessed under: `http://192.168.1.57:5000`
within the same network (e.g. home network).
