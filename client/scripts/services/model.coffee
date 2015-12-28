angular
  .module 'OtttoApp'
  .service 'Model', ($sails) ->

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

        $sails.on @$resource, @$_respond


      $get: =>
        return unless @$attributes.id

        $sails
          .get @$unique()
          .then (response) =>
            @$_reset response.data
            return @


      $save: =>
        return unless @$attributes.id

        $sails
          .put @$unique(), @$_difference()
          .then (response) =>
            @$_reset response.data
            return @


      $destroy: =>
        return unless @$attributes.id

        $sails.delete @$unique()


      $pristine: -> !_.isEqual @$_pristine, @$attributes
      $dirty: -> !_.isEqual @$_pristine, @$attributes


      $_set: (attributes) =>
        attributes = _.assign {}, @$attributes, attributes

        @$attributes = _.cloneDeep attributes


      $_reset: (attributes) =>
        attributes = _.assign {}, @$attributes, attributes

        @$_pristine = _.cloneDeep attributes
        @$attributes = _.cloneDeep attributes


      $_difference: => ObjectDifference @$_pristine, @$attributes


      # $_filter: (attributes) ->
      #   ObjectFilter attributes, (key, value) ->
      #     key.substring(0,1) isnt '$'


      $_respond: (message) =>
        return unless message.id is @$attributes.id

        switch message.verb
          when 'updated' then @$_reset message.data
          when 'destroyed' then console.log 'delete'