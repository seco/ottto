#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

int powerPin = 0;
int levelPin = 1;

const char* ssid = "...";
const char* password = "...";

ESP8266WebServer server(80);

void setup() {
  pinMode(powerPin, OUTPUT);
  digitalWrite(powerPin, HIGH);

  pinMode(levelPin, OUTPUT);
  digitalWrite(levelPin, 255);

  Serial.begin(115200);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  server.on("/", request);
  server.onNotFound(request);
  server.begin();

  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("HTTP server started");
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
  StaticJsonBuffer<500> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();

  boolean powerValue = digitalRead(powerPin);
  json["power"] = powerValue;
  Serial.print("power: ");
  Serial.println(powerValue);

  int levelValue = analogRead(levelPin);
  json["level"] = levelValue;
  Serial.print("level: ");
  Serial.println(levelValue);

  String body;
  json.prettyPrintTo(body);

  server.send(200, "application/json; charset=utf-8", body);
}

void post() {
  String message = "";
  for ( uint8_t i = 0; i < server.args(); i++ ) {
		message += " " + server.argName ( i ) + ": " + server.arg ( i ) + "\n";
	}
  Serial.println(message);

  String powerValue = server.arg("power");
  if (powerValue == "true" || powerValue == "1") digitalWrite(powerPin, HIGH);
  else if (powerValue == "false" || powerValue == "0") digitalWrite(powerPin, LOW);

  // String levelValue = server.arg("level");
  // analogWrite(levelPin, levelValue.toInt());

  respond();
}

void set(char parameter, bool value) {
  switch(parameter) {
    case 'power':
      digitalWrite(powerPin, value);
      break;
    case 'level':
      digitalWrite(levelPin, value);
      break;
  }
}
