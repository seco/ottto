#include <DNSServer.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <WiFiManager.h>
#include <ArduinoJson.h>
#include <my9291.h>

#define MY9291_DI_PIN   13
#define MY9291_DCKI_PIN 15

my9291 lights = my9291(MY9291_DI_PIN, MY9291_DCKI_PIN, MY9291_COMMAND_DEFAULT);

String baseAddress = "http://192.168.1.11:1337";

ESP8266WebServer server(80);
WiFiManager wifiManager;


void setup() {
  Serial.begin(115200);
  wifiManager.autoConnect("Light Bulb");

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Mac address: ");
  Serial.println(WiFi.macAddress());
  Serial.print("Chip: ");
  Serial.println(ESP.getChipId());

  connect();
  setPower(true);
  send();

  server.on("/", serve);
  server.begin();
}


void loop() {
  server.handleClient();
}


void rainbow(unsigned char index) {
  if (index < 85) {
    lights.setColor((my9291_color_t) { (unsigned int) index * 3, (unsigned int) 255 - index * 3, 0, 0 });
  } else if (index < 170) {
    index -= 85;
    lights.setColor((my9291_color_t) { (unsigned int) 255 - index * 3, 0, (unsigned int) index * 3, 0 });
  } else {
    index -= 170;
    lights.setColor((my9291_color_t) { 0, (unsigned int) index * 3, (unsigned int) 255 - index * 3, 0 });
  }
}


void connect() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  json["chip"] = ESP.getChipId();
  json["ip"] = WiFi.localIP().toString();

  String body;
  json.prettyPrintTo(body);
  Serial.print("Register: ");
  Serial.println(body);

  HTTPClient http;
  http.begin(baseAddress + "/api/modules/register");
  http.addHeader("Content-Type", "application/json");
  http.POST(body);
  http.end();
}


void send() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  JsonObject& values = json.createNestedObject("values");
  values["power"] = getPower();

  String body;
  json.prettyPrintTo(body);
  Serial.print("Send: ");
  Serial.println(body); // Debugging

  HTTPClient http;
  http.begin(baseAddress + "/api/modules/16");
  http.addHeader("Content-Type", "application/json");
  http.POST(body);
  http.end();
}


void serve() {
  (server.method() == HTTP_PUT)
    ? listen()
    : respond();
}


void listen() {
  StaticJsonBuffer<200> newBuffer;
  JsonObject& body = newBuffer.parseObject(server.arg("plain"));
  bool powerValue = body["values"]["power"];

  setPower(powerValue);
  respond();
}


void respond() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  JsonObject& values = json.createNestedObject("values");
  values["power"] = getPower();

  String body;
  json.prettyPrintTo(body);
  Serial.print("Respond: ");
  Serial.println(body); // Debugging

  server.send(200, "application/json; charset=utf-8", body);
}


String getPower() {
  lights.getState();
}


void setPower(bool powerValue) {
  lights.setColor((my9291_color_t) { 255, 255, 255, 255 });
  lights.setState(powerValue);
}
