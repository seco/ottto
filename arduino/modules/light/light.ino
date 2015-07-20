#include "SPI.h"
#include "ArduinoJson.h"
#include "nRF24L01.h"
#include "RF24.h"
#include "printf.h"


RF24 radio(7,8);
const uint64_t pipes[2] = { 0xF0F0F0F0E1LL, 0xF0F0F0F0D2LL };
const int light_pin = 3;
int light_val = 0;
int light_state = LOW;

const int max_payload_size = 128;
char payload[max_payload_size+1];

void setup(void) {

  Serial.begin(57600);
  printf_begin();
  printf("\n\rOttto::Module::Light\n\r");

  pinMode(light_pin, OUTPUT);

  radio.begin();
  
  radio.enableDynamicPayloads();
  radio.setCRCLength(RF24_CRC_16);
  radio.setDataRate(RF24_2MBPS);
  radio.setPALevel(RF24_PA_MAX);
  radio.setChannel(76);
  radio.setRetries(10, 1000);

  radio.openReadingPipe(1, pipes[0]);
  radio.openWritingPipe(pipes[1]);

  radio.printDetails();
  radio.startListening();

}

void loop(void) {

  light_val = digitalRead(light_pin);

  if( (light_val == HIGH && light_state == LOW) || (light_val == LOW && light_state == HIGH) ) {

    light_state = light_val;

    if( light_state )
      send("{\"light\":1}");
    else
      send("{\"light\":0}");

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
  
  radio.startListening();

}


// Create buffer
// Loop through transmissions
// Wait for timeout or stop command
void receive(void) {
  
  if (radio.available()) {

    StaticJsonBuffer<200> jsonBuffer;
    uint8_t len;
    bool done = false;

    while (!done) {
      len = radio.getDynamicPayloadSize();
      done = radio.read(payload, len);
    }
   
    // payload[len] = 0;
    // printf("Got payload size=%i value=%s\n\r",len,payload);

    JsonObject& root = jsonBuffer.parseObject(payload);

    if (root.success()) {
      root.prettyPrintTo(Serial);
      Serial.println();
    } else {
      Serial.println("parseObject() failed");
    }
   
  }
  
}
