angular
  .module 'OtttoApp'
  .service 'Model', ($sails) ->

    class Model

      $url: '/'
      $prefix: 'api/'
      $resource: 'items'

      $path: => "#{@$url}#{@$prefix}#{@$resource}"
      $unique: => "#{@$path()}/#{@id}"

      $ignored: ['createdAt', 'updatedAt']


      constructor: (attributes) ->
        @$_apply attributes

        $sails.on @$resource, @$_respond


      $get: =>
        return unless @id

        $sails
          .get @$unique()
          .then (response) -> response.data


      $save: =>
        $sails
          .put @$unique(), @$_attributes()
          .then (response) -> response.data


      $destroy: =>
        $sails.delete @$unique()


      $_apply: (attributes) =>
        if attributes then @[key] = value for key,value of attributes


      $_attributes: =>
        keys = Object.keys(@).filter (key) =>
          key.substring(0,1) isnt '$' and key not in @$ignored

        attributes = {}
        attributes[key] = @[key] for key in keys
        attributes


      $_respond: (message) =>
        return unless message.id is @id

        switch message.verb
          when 'updated' then @$_apply values: message.data.values
          when 'destroyed' then console.log 'delete'