#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const int moisturePin = 0;

const char* ssid = "HOME-A7C2";
const char* password = "chair5974guitar";

const char* host = "localhost";
const int port = 1337;
const char* url = "/api/modules/22";

ESP8266WebServer server(80);

void setup() {
  pinMode(moisturePin, INPUT);

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
  handleMoisture();
}

void handleMoisture() {
  request();
  delay(1000);
}

void request() {
  HTTPClient http;

  String body = "values[moisture]=";
  body += getMoisture();

  http.begin("http://10.0.0.6:1337/api/modules/22");
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

  json["moisture"] = getMoisture();

  String body;
  json.prettyPrintTo(body);
  json.prettyPrintTo(Serial);
  server.send(200, "application/json; charset=utf-8", body);
}


int getMoisture() {
  int moisture = map(analogRead(moisturePin), 300, 1024, 4, 0);
  Serial.print("moisture: ");
  Serial.print(analogRead(moisturePin));
  Serial.print(" / ");
  Serial.println(moisture);
  return moisture;
}
