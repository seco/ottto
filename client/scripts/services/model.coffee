angular
  .module 'OtttoApp'
  .service 'Model', [
    '$sails'
    'mqtt'
    (
      $sails
      mqtt
    ) ->

      class Model

        $url: '/'
        $prefix: 'api/'
        $resource: 'items'

        $path: => "#{@$url}#{@$prefix}#{@$resource}"
        $unique: => "#{@$path()}/#{@$attributes.id}"

        $attributes: {}
        $_pristine: {}


        constructor: (attributes) ->
          @$_reset attributes

          mqtt.subscribe "#{@$resource}/#{@$attributes.id}", @$_respond


        $create: =>
          return if @$attributes.id

          $sails
            .post @$path(), @$_difference()
            .then (response) =>
              @$_reset response.data


        $get: =>
          return unless @$attributes.id

          $sails
            .get @$unique()
            .then (response) =>
              @$_reset response.data
              return @


        $save: =>
          return unless @$attributes.id
          return if _.isEmpty @$_difference()

          $sails
            .put @$unique(), @$_difference()
            .then (response) =>
              @$_reset response.data
              return @


        $destroy: =>
          return unless @$attributes.id

          $sails.delete @$unique()


        $pristine: -> _.isEqual @$_pristine, @$attributes
        $dirty: -> !_.isEqual @$_pristine, @$attributes

        $new: -> !@$attributes.id?
        $old: -> @$attributes.id?


        $_set: (attributes) =>
          newAttributes = _.assign {}, @$attributes, attributes

          @$attributes = _.cloneDeep newAttributes


        $_reset: (attributes) =>
          newAttributes = _.extend {}, @$attributes, attributes

          @$_pristine = _.cloneDeep newAttributes
          @$attributes = _.cloneDeep newAttributes


        $_difference: => ObjectDifference @$_pristine, @$attributes


        $_respond: (message) =>
          @$_reset message

  ]
