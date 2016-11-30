#include "Dimmer.h"

Dimmer dimmer(3, DIMMER_RAMP, 1.5);

void setup() {
  Serial.begin(9600);
  dimmer.begin();
}

void loop() {
  Serial.println(100);
  dimmer.set(100);
  delay(1500);
  Serial.println(0);
  dimmer.set(0);
  delay(1500);
}
