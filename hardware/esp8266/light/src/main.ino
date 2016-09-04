#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>


int powerPin = D2;

const char* ssid = "...";
const char* password = "...";

ESP8266WebServer server(80);


void setup() {
  pinMode(powerPin, OUTPUT);

  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to: ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Mac address: ");
  Serial.println(WiFi.macAddress());
  Serial.print("Chip: ");
  Serial.println(ESP.getChipId());

  connect();
  setPower(true);

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
  bool powerValue = server.arg("power") == "true";
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
  server.send(200, "application/json; charset=utf-8", body);
  Serial.println(body); // Debugging
}


String getPower() {
  String powerValue = digitalRead(powerPin) ? "true" : "false";
  return powerValue;
}


void setPower(bool powerValue) {
  digitalWrite(powerPin, powerValue);
  send();
}
