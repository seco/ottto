#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const int photoPin = 0;

const char* ssid = "...";
const char* password = "...";

const char* host = "localhost";
const int port = 1337;
const char* url = "/api/modules/...";

ESP8266WebServer server(80);

void setup() {
  pinMode(photoPin, INPUT);

  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  server.on("/", respond);
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
  // server.handleClient();
  handleLight();
}

void handleLight() {
  request();
  delay(1000);
}

void request() {
  HTTPClient http;

  String body = "values[level]=";
  body += getBrightness();

  http.begin("http://10.0.0.6:1337/api/modules/20");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.POST(body);
  http.writeToStream(&Serial);
  http.end();
}

void respond() {
  get();
}

void get() {
  output();
}

void output() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();

  json["level"] = getBrightness();

  String body;
  json.prettyPrintTo(body);
  json.prettyPrintTo(Serial);
  server.send(200, "application/json; charset=utf-8", body);
}


int getBrightness() {
  int brightness = map(analogRead(photoPin), 0, 1024, 0, 4);
  Serial.println(brightness);
  return brightness;
}
