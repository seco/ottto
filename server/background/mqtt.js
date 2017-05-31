MqttService.on('clientConnected', function(client) {
  console.log('Client connected:', client.id);
});


MqttService.subscribe('modules/register/+', function(topic, message) {
  console.log('Register:', message.toString());
});


MqttService.subscribe('modules/+', function(topic, message, client) {
  var body = JSON.parse(message.toString())

  if(!body.id) return;
  if(!body.values) return;

  console.log('Received:', topic, body);

  ModulesService.update(body.id, body);
});
