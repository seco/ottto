#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

int motionPin = 0;
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
  bool motionValue = digitalRead(motionPin);

  bool highToLow = motionValue == HIGH && motionState == LOW;
  bool lowToHigh = motionValue == LOW && motionState == HIGH;

  if (highToLow || lowToHigh) {
    motionState = motionValue;
    request();
  }

  delay(100);
}

void request() {
  HTTPClient http;

  Serial.println("------------------");
  Serial.println("Making request...");

  String body = "values[motion]=";
  body += digitalRead(motionPin) ? "true" : "false";

  http.begin("http://10.0.0.6:1337/api/modules/9");
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

  bool motionValue = digitalRead(motionPin);
  json["motion"] = motionValue;

  String body;
  json.prettyPrintTo(body);
  server.send(200, "application/json; charset=utf-8", body);
}
