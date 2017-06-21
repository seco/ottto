#include "Ottto.h"


const int motionPin = D0;
bool motionState = LOW;

const char* serverAddress = "192.168.1.10";
const int mqttPort = 1883;
const int httpPort = 1337;

char moduleName[] = "motionsensor";
char topic[] = "modules/9";

Ottto ottto(moduleName, serverIp, mqttPort);


void setup() {
  pinMode(motionPin, INPUT);

  Serial.begin(115200);

  wifiManager.autoConnect(moduleName);
  client.setServer(serverAddress, mqttPort);
  client.setCallback(callback);
}


void receive(char* topic, uint8_t* payload, unsigned int length) {
  Serial.print("Received: ");
  Serial.print(topic);
  Serial.print(": ");

  // Build message buffer
  char message[length + 1];
  for (int i = 0; i < length; i++) {
    message[i] = (char)payload[i];
  }
  message[length] = '\0';
  Serial.println(message);

  // processJson(message);
}

// bool processJson(char* message) {
//   StaticJsonBuffer<200> jsonBuffer;
//   JsonObject& json = jsonBuffer.parseObject(message);
//
//   if (!json.success()) {
//     Serial.println("parseObject() failed");
//   }
//
//   // Do something with the new data
// }


void loop() {
  if (!client.connected()) {
    connect();
  }

  client.loop();

  bool motionValue = digitalRead(motionPin);
  bool highToLow = motionValue == HIGH && motionState == LOW;
  bool lowToHigh = motionValue == LOW && motionState == HIGH;

  if (highToLow || lowToHigh) {
    motionState = motionValue;
    publish();
  }
}


void connect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect(moduleName)) {
      Serial.println("connected");
      registration();
      client.subscribe("modules/9");
      publish();
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}


void registration() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.parseObject(message);

  if (!json.success()) {
    Serial.println("parseObject() failed");
  } else {
    // Do something with the message
  }
}


void publish() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  JsonObject& values = json.createNestedObject("values");
  bool motion = digitalRead(motionPin);
  values["motion"] = motion;

  // Build message Buffer
  char buffer[json.measureLength() + 1];
  json.printTo(buffer, sizeof(buffer));

  Serial.print("Sending: ");
  Serial.println(buffer);

  return buffer;
}
