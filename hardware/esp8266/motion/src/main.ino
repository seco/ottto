#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
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
  WiFiClient client;

  Serial.println("Making request...");

  if (!client.connect(host, port)) {
    Serial.println("Cannot connect...");
    return;
  }

  client.print("PUT ");
  client.print(url);
  client.println(" HTTP/1.1");

  client.print("Host: ");
  client.println(host);

  client.println("Connection: close");

  client.println();

  client.print("values[motion]=");
  client.println(digitalRead(motionPin)?"true":"false");

  while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }

  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      Serial.println("Timeout...");
      client.stop();
      return;
    }
  }
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
