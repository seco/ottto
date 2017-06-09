/*
  Ottto.h - An IoT library
  Justin Jones
  http://getottto.com/
*/

#ifndef Ottto_h
#define Ottto_h

#include <functional>
#include "Arduino.h"
#include "IPAddress.h"
#include "ESP8266WiFi.h"
#include "PubSubClient.h"
#include "WiFiManager.h"
#include "ArduinoJson.h"


class Ottto {
  public:
    Ottto(char*, IPAddress, int);
    void connect();
    void setTopic(char*);
    void subscribeWith(std::function<void(char*, uint8_t*, unsigned int)>);
    void publishWith(std::function<char*(void)>);
    void publish();
    void loop();
  private:
    PubSubClient client;
    WiFiManager wifiManager;
    WiFiClient espClient;
    IPAddress serverIp;
    int mqttPort;
    char* moduleName;
    char* topic;
    std::function<void(char*, uint8_t*, unsigned int)> subscribeCallback;
    std::function<char*(void)> publishCallback;
};

#endif
