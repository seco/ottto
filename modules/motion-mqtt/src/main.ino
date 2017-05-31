#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <WiFiManager.h>
#include <ArduinoJson.h>


const int motionPin = D0;
bool motionState = LOW;

const char* serverIp = "192.168.1.9";
const int mqttPort = 1883;
const int httpPort = 1337;

const char* moduleName = "motionsensor";

WiFiManager wifiManager;
WiFiClient espClient;
PubSubClient client(espClient);



void setup() {
  pinMode(motionPin, INPUT);

  Serial.begin(115200);

  setupWifi();
  setupMqttClient();
}


void setupWifi() {
  wifiManager.autoConnect(moduleName);
}


void setupMqttClient() {
  client.setServer(serverIp, mqttPort);
  client.setCallback(callback);
}


void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Received: ");
  Serial.print(topic);
  Serial.print(": ");

  char message[length + 1];
  for (int i = 0; i < length; i++) {
    message[i] = (char)payload[i];
  }
  message[length] = '\0';
  Serial.println(message);

  // processJson(message);
}

// bool processJson(char* message) {
//   StaticJsonBuffer<200> jsonBuffer;
//   JsonObject& json = jsonBuffer.parseObject(message);
//
//   if (!json.success()) {
//     Serial.println("parseObject() failed");
//   }
//
//   // Do something with the new data
// }


void loop() {
  if (!client.connected()) {
    connectToServer();
  }

  client.loop();

  bool motionValue = digitalRead(motionPin);
  bool highToLow = motionValue == HIGH && motionState == LOW;
  bool lowToHigh = motionValue == LOW && motionState == HIGH;

  if (highToLow || lowToHigh) {
    motionState = motionValue;
    sendState();
  }
}


void connectToServer() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect(moduleName)) {
      Serial.println("connected");
      registerWithServer();
      client.subscribe("modules/9");
      sendState();
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}


void registerWithServer() {
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
}


void sendState() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  JsonObject& values = json.createNestedObject("values");
  values["motion"] = getMotion();

  char buffer[json.measureLength() + 1];
  json.printTo(buffer, sizeof(buffer));
  Serial.print("Sending: ");
  Serial.print("modules/9: ");
  Serial.println(buffer);

  client.publish("modules/9", buffer, true);
}


bool getMotion() {
  bool motionValue = digitalRead(motionPin) ? true : false;
  return motionValue;
}
