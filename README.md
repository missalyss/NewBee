# NewBee
========================

NewBee is a mobile app that utilizes Internet of Things (among other things) to aide "newbee" beekeepers understand how to care for their hive.


## Features
<img src="www/img/readme/splash.PNG"> | <img src="www/img/readme/dash.PNG">

### Inspections

<img src="www/img/readme/inspect_all.PNG">  <img src="www/img/readme/inspect_new.PNG">

### Monitor

<img src="www/img/readme/chart.PNG">

<img src="www/img/readme/chart_dates.PNG">

### Bee MD

<img src="www/img/readme/causes_all.PNG">  <img src="www/img/readme/causes_show.PNG">

## Installation
The repository can be downloaded and run as a web application for development/testing:

1. Run npm install to download necessary dependencies.
2. Make sure Ionic v1 is installed: http://ionicframework.com/getting-started
3. In the terminal, use Ionic to run the application:
```
$ ionic serve
```

Native mobile downloads of the app are currently only available with TestFlight via invite of developer.

## Technology
AngularJS, Ionic v1, JavaScript, Node.js, PostgreSQL, ExpressJS, Knex.js, SASS, Bootstrap

## Backend Repositories

#### BeeMD:
- Public API that acts as a "Web MD" for bees
- [GitHub](https://github.com/missalyss/Bee_MD)
- [Deployed site](https://bee-md.herokuapp.com/)

#### Internet of Stings:
- Mostly private API that collects user information including inspection logs and beehive monitor data
- [GitHub](https://github.com/missalyss/internet_of_stings_api)
- [Deployed site](https://internet-of-stings.herokuapp.com/)

#### Honey Pi:
- Beehive monitor used in Raspberry Pi. Written in Python, and uses the [Adafruit DHT Library](https://github.com/adafruit/Adafruit_Python_DHT)
- [GitHub](https://github.com/missalyss/honey_pi)

## Developed July 2017:

#### Alyssa Evans:
- [GitHub](https://github.com/missalyss)
- [LinkedIn](https://www.linkedin.com/in/alyssa-m-evans/)
- Contact developer at alyssa.m.evans@gmail.com for information on how to download the app through iOS' TestFlight.
