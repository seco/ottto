/*
  Ottto.cpp - An IoT library
  Justin Jones
  http://getottto.com/
*/

#include "Ottto.h"


Ottto::Ottto(char* moduleName, IPAddress serverIp, int mqttPort) {
  this->moduleName = moduleName;
  this->serverIp = serverIp;
  this->mqttPort = mqttPort;

  WiFiManager wifiManager;
  WiFiClient espClient;
  PubSubClient client(espClient);
}


void Ottto::connect() {
  wifiManager.autoConnect(this->moduleName);
  client.setServer(this->serverIp, this->mqttPort);
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
  char* payload = this->publishCallback();
  client.publish(topic, payload, true);
}


void Ottto::loop() {
  if (!client.connected()) {
    while (!client.connected()) {
      Serial.print("Attempting MQTT connection...");
      if (client.connect(this->moduleName)) {
        Serial.println("connected");

        // Build payload, and publish registration
        StaticJsonBuffer<200> jsonBuffer;
        JsonObject& json = jsonBuffer.createObject();
        json["chip"] = ESP.getChipId();
        json["ip"] = WiFi.localIP().toString();
        json["type"] = "motion";
        char buffer[json.measureLength() + 1];
        Serial.print("modules/register: ");
        json.printTo(buffer, sizeof(buffer));
        Serial.println(buffer);
        client.publish("modules/register", buffer);

        client.subscribe(topic);
        this->publish();
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
