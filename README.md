# Ottto - Home Automation

The primary goal of Ottto is to lessen the required knowledge and/or cost of connecting everyday items to the Internet of Things. For something as simple as turning on a light when remote motion is triggered to setting up a fully automated home security system to building a completely customized home theater experience, Ottto is designed to be a flexible and inexpensive solution to home automation.

## Server

A SailsJS app that feeds a RESTful API of modules, rules, groups, and users. Serves a root level public directory. It is designed to run on a Raspberry Pi (but in theory can be installed on any computer with accessible GPIO) connected to an NRF24L01 radio.

## Client

An AngularJS app for reading and interacting with server data representing module statuses and actions.

## Arduino

Storage for modules code, based around Arduino and NRF24L01 radios.
