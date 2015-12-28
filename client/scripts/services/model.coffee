angular
  .module 'OtttoApp'
  .service 'Model', ($sails) ->

    class Model

      $url: '/'
      $prefix: 'api/'
      $resource: 'items'

      $path: => "#{@$url}#{@$prefix}#{@$resource}"
      $unique: => "#{@$path()}/#{@id}"


      constructor: (attributes) ->
        @$_setup attributes

        $sails.on @$resource, @$_respond


      $get: =>
        return unless @id

        $sails
          .get @$unique()
          .then (response) =>
            @$_setup response.data
            return @


      $save: =>
        $sails
          .put @$unique(), @$_changed()
          .then (response) =>
            @$_setup response.data
            return @


      $destroy: => $sails.delete @$unique()


      $_set: (attributes) =>
        diff = ObjectDifference @$_attributes(), @$_filter attributes

        _.assign @, diff unless _.isEmpty diff


      $_setup: (attributes) =>
        @$_set attributes
        @$_pristine = _.cloneDeep @$_attributes()


      $_attributes: => @$_filter @


      $_changed: => ObjectDifference @$_pristine, @$_attributes()


      $_filter: (attributes) ->
        ObjectFilter attributes, (key, value) ->
          key.substring(0,1) isnt '$'


      $_respond: (message) =>
        return unless message.id is @id

        switch message.verb
          when 'updated' then @$_setup message.data
          when 'destroyed' then console.log 'delete'