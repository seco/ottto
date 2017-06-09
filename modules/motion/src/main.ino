#include "Ottto.h"


const int motionPin = D0;
bool motionState = LOW;

IPAddress serverIp(192,168,1,9);
int mqttPort = 1883;
int httpPort = 1337;

char moduleName[] = "motionsensor";
char topic[] = "modules/9";

Ottto ottto(moduleName, serverIp, mqttPort);


void setup() {
  pinMode(motionPin, INPUT);

  Serial.begin(115200);

  ottto.setTopic(topic);
  ottto.subscribeWith(receive);
  ottto.publishWith(send);
  ottto.connect();
}


void loop() {
  ottto.loop();

  bool motionValue = digitalRead(motionPin);
  bool highToLow = motionValue == HIGH && motionState == LOW;
  bool lowToHigh = motionValue == LOW && motionState == HIGH;

  if (highToLow || lowToHigh) {
    motionState = motionValue;
    ottto.publish();
  }
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

  // Parse message into JSON
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.parseObject(message);

  if (!json.success()) {
    Serial.println("parseObject() failed");
  } else {
    // Do something with the message
  }
}


char* send() {
  // Create JSON buffer
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
