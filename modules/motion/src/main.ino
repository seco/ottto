#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const int motionPin = D2;
bool motionState = LOW;

const char* ssid = "...";
const char* password = "...";

const char* host = "localhost";
const int port = 1337;
const char* url = "/api/modules/9";

ESP8266WebServer server(80);


void setup() {
  pinMode(motionPin, INPUT);

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
  http.begin("http://10.0.0.6:1337/api/modules/register");
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
  http.begin("http://10.0.0.6:1337/api/modules/9");
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
