#include "SPI.h"
#include "ArduinoJson.h"
#include "nRF24L01.h"
#include "RF24.h"
#include "printf.h"


RF24 radio(7,8);
const uint64_t pipes[2] = { 0xF0F0F0F0E1LL, 0xF0F0F0F0D2LL };
const int motion_pin = 3;
bool state = 0;
bool newState = 0;
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

  radio.openReadingPipe(1, pipes[1]);
  radio.openWritingPipe(pipes[0]);

  radio.printDetails();
  radio.startListening();

}

void loop(void) {

  newState = digitalRead(motion_pin);

  if (
    (newState == 1 && state == 0) ||
    (newState == 0 && state == 1)
  ) {

    state = newState;
    root["motion"] = state;

    char buffer[256];
    root.printTo(buffer, sizeof(buffer));

    send(buffer);

  }

  receive();

  delay(100);
}


// Switch to write mode
// Loop through message
// Transmit each character
// Send stop command
// Switch back to read mode
void send(String message) {
  
  int length = message.length();
  char buffer[length+1];
  
  radio.stopListening();

  message.toCharArray(buffer, length+1);
  radio.write(buffer, length);
  Serial.println(buffer);
  
  radio.startListening();

}

// Create buffer
// Loop through transmissions
// Wait for timeout or stop command
void receive(void) {

  // while (radio.available()) {
  // }

}
