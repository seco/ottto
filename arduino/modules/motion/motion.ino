#include <SPI.h>
#include "nRF24L01.h"
#include "RF24.h"
#include "printf.h"


RF24 radio(7,8);
const uint64_t pipes[2] = { 0xF0F0F0F0E1LL, 0xF0F0F0F0D2LL };
const int motion_pin = 3;
int motion_val = 0;
int motion_state = LOW;

void setup(void) {

  Serial.begin(57600);
  Serial.println("Ottto::Module::Motion");
  printf_begin();

  pinMode(motion_pin, INPUT);

  radio.begin();

  radio.enableDynamicPayloads();
  // radio.enableAckPayload();
  radio.setCRCLength(RF24_CRC_16);
  radio.setDataRate(RF24_2MBPS);
  radio.setPALevel(RF24_PA_MAX);
  radio.setChannel(76);
  radio.setRetries(15,4000);

  radio.openWritingPipe(pipes[0]);
  radio.openReadingPipe(1,pipes[1]);

  radio.printDetails();
  radio.startListening();

  delay(1000);

}

void loop(void) {

  motion_val = digitalRead(motion_pin);

  if( (motion_val == HIGH && motion_state == LOW) || (motion_val == LOW && motion_state == HIGH) ) {

    motion_state = motion_val;

    if( motion_state ) {
      Serial.println("motion:1");
      send("{\"motion\":1}");
    } else {
      Serial.println("motion:0");
      send("{\"motion\":0}");
    }

  }

  delay(500);

}

void send(String message) {

  radio.stopListening();

  int length = message.length();
  char buffer[length+1];
  message.toCharArray(buffer, length+1);

  radio.write(buffer, length);
  radio.startListening();

}