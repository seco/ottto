#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const int doorPin = 16;
bool doorState = HIGH;

const char* ssid = "...";
const char* password = "...";

const char* host = "localhost";
const int port = 1337;
const char* url = "/api/modules/23";

ESP8266WebServer server(80);

void setup() {
  pinMode(doorPin, INPUT);

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
  handleMotion();
}

void handleMotion() {
  bool doorValue = digitalRead(doorPin);

  bool highToLow = doorValue == HIGH && doorState == LOW;
  bool lowToHigh = doorValue == LOW && doorState == HIGH;

  if (highToLow || lowToHigh) {
    doorState = doorValue;
    request();
  }

  delay(100);
}

void request() {
  HTTPClient http;

  String body = "values[status]=";
  body += getMotion();

  http.begin("http://10.0.0.6:1337/api/modules/23");
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

  json["status"] = getMotion();

  String body;
  json.prettyPrintTo(body);
  json.prettyPrintTo(Serial);
  server.send(200, "application/json; charset=utf-8", body);
}

String getMotion() {
  String doorValue = digitalRead(doorPin) ? "false" : "true";
  return doorValue;
}
