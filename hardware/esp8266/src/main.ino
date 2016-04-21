#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
// #include <ArduinoJson.h>

int led = 0;

const char* ssid = "...";
const char* password = "...";

ESP8266WebServer server(80);

void setup(void) {
  pinMode(led, OUTPUT);
  digitalWrite(led, LOW);

  Serial.begin(115200);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  server.on("/", handleRoot);
  server.on("/on", handleOn);
  server.on("/off", handleOff);
  server.onNotFound(handleRoot);
  server.begin();

  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("HTTP server started");
}

void handleRoot() {
  server.send(200, "text/html", "<a href=\"/on\">on</a> <a href=\"/off\">off</a>");
}

void handleOn() {
  setLightPower(HIGH);
  server.send(200, "text/html", "on <a href=\"/off\">off</a>");
}

void handleOff(){
  setLightPower(LOW);
  server.send(200, "text/html", "<a href=\"/on\">on</a> off");
}

void loop(void) {
  server.handleClient();
}

void setLightPower(bool power) {
  digitalWrite(led, power);
}
