#include <DNSServer.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <WiFiManager.h>
#include <ArduinoJson.h>


const int motionPin = D2;
bool motionState = LOW;
String baseAddress = "http://192.168.1.11:1337";

ESP8266WebServer server(80);
WiFiManager wifiManager;


void setup() {
  pinMode(motionPin, INPUT);

  Serial.begin(115200);
  wifiManager.autoConnect("Motion Sensor");

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Mac address: ");
  Serial.println(WiFi.macAddress());
  Serial.print("Chip: ");
  Serial.println(ESP.getChipId());

  connect();
  send();

  server.on("/", respond);
  server.begin();
}


void connect() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  json["chip"] = ESP.getChipId();
  json["ip"] = WiFi.localIP().toString();

  String body;
  json.prettyPrintTo(body);
  Serial.println(body);

  HTTPClient http;
  http.begin(baseAddress + "/api/modules/register");
  http.addHeader("Content-Type", "application/json");
  http.POST(body);
  http.end();
}


void loop() {
  server.handleClient();
  handleMotion();

  delay(100);
}


void handleMotion() {
  bool motionValue = digitalRead(motionPin);

  bool highToLow = motionValue == HIGH && motionState == LOW;
  bool lowToHigh = motionValue == LOW && motionState == HIGH;

  if (highToLow || lowToHigh) {
    motionState = motionValue;
    send();
  }
}


void send() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  JsonObject& values = json.createNestedObject("values");
  values["motion"] = getMotion();

  String body;
  json.prettyPrintTo(body);
  Serial.println(body); // Debugging

  HTTPClient http;
  http.begin(baseAddress + "/api/modules/9");
  http.addHeader("Content-Type", "application/json");
  http.POST(body);
  http.end();
}


void respond() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  JsonObject& values = json.createNestedObject("values");
  values["motion"] = getMotion();

  String body;
  json.prettyPrintTo(body);
  Serial.println(body); // Debugging

  server.send(200, "application/json; charset=utf-8", body);
}


String getMotion() {
  String motionValue = digitalRead(motionPin) ? "true" : "false";
  return motionValue;
}
