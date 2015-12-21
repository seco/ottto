#include "SPI.h"
#include "ArduinoJson.h"
#include "nRF24L01.h"
#include "RF24.h"
#include "printf.h"


RF24 radio(7,8);
const uint64_t hub = 0xF0F0F0F0AALL;
const uint64_t me = 0xF0F0F0F0BBLL;
const int motion_pin = 3;

bool state = 0;
bool newState = 0;

const int max_payload_size = 128;
char payload[max_payload_size+1];

StaticJsonBuffer<200> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();


void setup(void) {

  Serial.begin(57600);
  printf_begin();
  printf("\n\rOttto::Module::Motion\n\r");

  pinMode(motion_pin, INPUT);

  radio.begin();
  
  radio.enableDynamicPayloads();
  radio.setCRCLength(RF24_CRC_16);
  radio.setDataRate(RF24_2MBPS);
  radio.setPALevel(RF24_PA_MAX);
  radio.setChannel(76);
  radio.setRetries(10, 1000);

  radio.openReadingPipe(1, me);
  radio.openWritingPipe(hub);

  radio.printDetails();
  radio.startListening();

}

void loop() {
  checkMotion();
  receive();
  delay(100);
}


// Check old state against new state
// Set old state to new state
// Update server with new state
void checkMotion() {

  newState = digitalRead(motion_pin);

  if (
    (newState == 1 && state == 0) ||
    (newState == 0 && state == 1)
  ) {

    state = newState;
    root["motion"] = state;

    send();

  }
  
}


// Switch to write mode
// Loop through message
// Transmit each character
// Send stop command
// Switch back to read mode
void send() {
  
  radio.stopListening();

  // TODO: Clean this shit up...
  char holder[256];
  root.printTo(holder, sizeof(holder));
  String str = holder;
  int length = str.length() + 1;
  char message[length];
  str.toCharArray(message, length);
  
  radio.write(message, length);
  Serial.println(message);
  
  radio.startListening();

}

// Create buffer
// Loop through transmissions
void receive(void) {

  // while (radio.available()) {
  // }

}
