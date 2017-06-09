/*
  Ottto.cpp - An IoT library
  Justin Jones
  http://getottto.com/
*/

#include "Ottto.h"


WiFiManager wifiManager;
WiFiClient espClient;
PubSubClient client(espClient);


Ottto::Ottto(char* _moduleName, IPAddress _serverIp, int _mqttPort) {
  moduleName = _moduleName;
  serverIp = _serverIp;
  mqttPort = _mqttPort;
}

// TODO Rename this, or handle connecting here as well
void Ottto::connect() {
  wifiManager.autoConnect(moduleName);
  client.setServer(serverIp, mqttPort);
}


void Ottto::setTopic(char* _topic) {
  topic = _topic;
}


void Ottto::subscribeWith(std::function<void(char*, uint8_t*, unsigned int)> callback) {
  subscribeCallback = callback;
  client.setCallback(subscribeCallback);
}


void Ottto::publishWith(std::function<char*(void)> callback) {
  publishCallback = callback;
}


void Ottto::publish() {
  char* payload = publishCallback();
  client.publish(topic, payload, true);
}


void Ottto::loop() {
  if (!client.connected()) {
    while (!client.connected()) {
      Serial.print("Attempting MQTT connection...");
      if (client.connect(moduleName)) {
        Serial.println("connected");

        // Build payload
        StaticJsonBuffer<200> jsonBuffer;
        JsonObject& json = jsonBuffer.createObject();
        json["chip"] = ESP.getChipId();
        json["ip"] = WiFi.localIP().toString();
        json["type"] = "motion";

        // Output to buffer
        char buffer[json.measureLength() + 1];
        json.printTo(buffer, sizeof(buffer));

        // Register
        Serial.print("modules/register: ");
        Serial.println(buffer);
        client.publish("modules/register", buffer);

        // Subscribe to and publish module
        client.subscribe(topic);
        publish();
      } else {
        Serial.print("failed, rc=");
        Serial.print(client.state());
        Serial.println(" try again in 5 seconds");
        delay(5000);
      }
    }
  }

  client.loop();
}
