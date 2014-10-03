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
  printf_begin();
  printf("\n\rOttto::Module::Motion\n\r");

  pinMode(motion_pin, INPUT);

  radio.begin();
  radio.enableDynamicPayloads();
  radio.setRetries(5,15);
  radio.openWritingPipe(pipes[0]);
  radio.openReadingPipe(1,pipes[1]);
  radio.startListening();
  radio.printDetails();

}

void loop(void) {

  motion_val = digitalRead(motion_pin);

  if( (motion_val == HIGH && motion_state == LOW) || (motion_val == LOW && motion_state == HIGH) ) {

    motion_state = motion_val;

    if( motion_state )
      send("on");
    else
      send("off");

  }

  receive();

  delay(100);
}

void send(String message) {
  // Switch to write mode
  // Loop through message
  // Transmit each character
  // Send stop command
  // Switch back to read mode

  printf("\n\rSent: ");

  radio.stopListening();

  int length = message.length();

  for (int i = 0; i < length; i++) {
    int character[1];
    character[0] = message.charAt(i);
    radio.write( character, 1 );
    printf("%s", character);
  }

  int stop[1] = { 2 };
  radio.write( stop, 1 );

  radio.startListening();

}

void receive(void) {
  // Create buffer
  // Loop through transmissions
  // Wait for timeout or stop command

  while( radio.available() ) {

  }

}