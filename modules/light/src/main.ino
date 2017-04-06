#include <DNSServer.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <WiFiManager.h>

#include <ArduinoJson.h>


int powerPin = D0;

ESP8266WebServer server(80);
WiFiManager wifiManager;


void setup() {
  pinMode(powerPin, OUTPUT);

  Serial.begin(115200);
  wifiManager.autoConnect("Light Bulb");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

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


void connect() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  json["chip"] = ESP.getChipId();
  json["ip"] = WiFi.localIP().toString();

  String body;
  json.prettyPrintTo(body);
  Serial.print("Connect: ");
  Serial.println(body);

  HTTPClient http;
  http.begin("http://10.0.0.6:1337/api/modules/register");
  http.addHeader("Content-Type", "application/json");
  http.POST(body);
  http.end();
}


void loop() {
  server.handleClient();
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
  http.begin("http://10.0.0.6:1337/api/modules/16");
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
  String powerValue = digitalRead(powerPin) ? "true" : "false";
  return powerValue;
}


void setPower(bool powerValue) {
  digitalWrite(powerPin, powerValue);
}
