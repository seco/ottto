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

  connect();

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
  Serial.println(ESP.getChipId());
}


void connect() {
  HTTPClient http;
  String body;
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();

  json["chip"] = ESP.getChipId();
  json["ip"] = WiFi.localIP().toString();
  json.prettyPrintTo(body);
  Serial.println(body);

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
  HTTPClient http;

  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();

  json["motion"] = getMotion();

  String body;
  json.prettyPrintTo(body);

  http.begin("http://10.0.0.6:1337/api/modules/9");
  http.addHeader("Content-Type", "application/json");
  http.POST(body);
  http.end();
  Serial.println(body); // Debugging
}


void respond() {
  Serial.println("respond");

  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();

  json["motion"] = getMotion();

  String body;
  json.prettyPrintTo(body);
  server.send(200, "application/json; charset=utf-8", body);
  Serial.println(body); // Debugging
}


String getMotion() {
  String motionValue = digitalRead(motionPin) ? "true" : "false";
  return motionValue;
}
