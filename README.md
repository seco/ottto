# Ottto - Home Automation

The primary goal of Ottto is to lessen the required knowledge and/or cost of connecting everyday items to the Internet of Things. For something as simple as turning on a light when remote motion is triggered to setting up a fully automated home security system to building a completely customized home theater experience, Ottto should be a flexible and inexpensive solution to home automation.


## Server

A Sails app that delivers a RESTful API of modules, groups, events, and rules.

### Getting Started

1. Install [Node & NPM](https://nodejs.org/en/)
2. `cd ./server`
3. `npm install`
4. `npm run dev`

#### TODO

* Software modules
  * Timer module (for conditions like "if the motion sensor has had no motion for 10 minutes")
  * Weather module
  * Cron module
* Ping modules for status (ensure modules are online)


## Client

An Angular app for reading and interacting with the API.  Intends to be responsive so you can easily access modules from your mobile, or tablet.

### Getting Started

1. `cd ./client`
2. `npm install`
3. `npm run dev`

#### TODO

* Switch to React, possibly React Native


## Modules

Modules are based on the ESP8266 chip, specifically the inexpensive NodeMCU boards.  Using [PlatformIO](http://docs.platformio.org/en/stable/installation.html), uploading code to the boards is incredibly easy.

### Getting Started

1. Install [PlatformIO](http://docs.platformio.org/en/stable/installation.html)
2. Connect to a NodeMCU board via USB
2. `cd ./modules/motion`
3. `platformio run --target upload`

#### TODO

* C library encapsulating the common interaction between the modules and the server
