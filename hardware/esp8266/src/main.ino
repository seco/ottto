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
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();

  bool powerValue = digitalRead(powerPin);
  json["power"] = powerValue;
  Serial.print('power: ');
  Serial.println(powerValue);

  String body;
  json.prettyPrintTo(body);

  server.send(200, "application/json; charset=utf-8", body);
}

void post() {
  String incoming = "";
  for ( uint8_t i = 0; i < server.args(); i++ ) {
		incoming += server.argName ( i ) + ": " + server.arg ( i ) + "\n";
	}
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.parseObject(incoming);

  bool powerValue = json["power"];
  digitalWrite(powerPin, powerValue);
  Serial.print('power: ');
  Serial.println(powerValue);

  respond();
}
