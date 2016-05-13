#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

int powerPin = 0;

const char* ssid = "...";
const char* password = "...";

ESP8266WebServer server(80);

void setup() {
  pinMode(powerPin, OUTPUT);
  digitalWrite(powerPin, HIGH);

  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  server.on("/", request);
  // server.onNotFound(request);
  server.begin();

  Serial.println("");
  Serial.print("Connected to: ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Mac address: ");
  Serial.println(WiFi.macAddress());
  Serial.print("Chip: ");
  Serial.print(ESP.getChipId());
}

void loop() {
  server.handleClient();
}

void request() {
  (server.method() == HTTP_GET) ? get() : post();
}

void get() {
  respond();
}

void respond() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();

  bool powerValue = digitalRead(powerPin);
  json["power"] = powerValue;

  String body;
  json.prettyPrintTo(body);
  server.send(200, "application/json; charset=utf-8", body);
}

void post() {
  receive();
  respond();
}

void receive() {
  bool powerValue = server.arg("power") == "true";
  digitalWrite(powerPin, powerValue);
}
