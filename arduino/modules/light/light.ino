#include "SPI.h"
#include "ArduinoJson.h"
#include "nRF24L01.h"
#include "RF24.h"
#include "printf.h"


RF24 radio(7,8);
const uint64_t pipes[2] = { 0xF0F0F0F0E1LL, 0xF0F0F0F0D2LL };
const int light_pin = 3;

int state = 0;
int newState = 0;

const int max_payload_size = 128;
char payload[max_payload_size+1];


void setup() {

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

void loop() {
  receive();
  delay(100);
}


void receive() {
  
  if (radio.available()) {

    uint8_t len;
    bool done = false;
  
    while (!done) {
      len = radio.getDynamicPayloadSize();
      done = radio.read(payload, len);
    }
    
    parse(payload);
  }
  
}


void parse(char* payload) {

  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& response = jsonBuffer.parseObject(payload);

  if (response.success()) {
    response.printTo(Serial);
    Serial.println();

    if (response["motion"]) {
      execute(100);
    } else {
      execute(0);
    }
    
  }
  
}

void execute(int level) {

  int value = level / 100 * 255;
  
  analogWrite(light_pin, value);

}

