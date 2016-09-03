#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>


int powerPin = D2;

const char* ssid = "...";
const char* password = "...";

ESP8266WebServer server(80);


void setup() {
  pinMode(powerPin, OUTPUT);
  setPower(true);

  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  server.on("/", serve);
  server.begin();

  Serial.println("");
  Serial.print("Connected to: ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Mac address: ");
  Serial.println(WiFi.macAddress());
  Serial.print("Chip: ");
  Serial.println(ESP.getChipId());
}


void loop() {
  server.handleClient();

  delay(100);
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

  json["power"] = getPower();

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
}
