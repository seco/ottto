angular
  .module 'mqtt', []
  .service 'mqtt', [
    '$rootScope'
    '$window'
    (
      $rootScope
      $window
    ) ->


      class MqttService
        constructor: ->
          @callbacks = {}

          @client = $window.mqtt.connect port: 1884
          @client.on 'message', (topic, payload) =>
            message = JSON.parse payload.toString()

            @callbacks[topic] = [] unless @callbacks[topic]
            @callbacks[topic].forEach (callback) ->
              $rootScope.$apply -> callback message


        subscribe: (topic, callback) =>
          @callbacks[topic] = [] unless @callbacks[topic]
          @callbacks[topic].push callback

          @client.subscribe 'modules/9'


      new MqttService


  ]
