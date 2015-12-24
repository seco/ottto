angular
  .module 'OtttoApp'
  .service 'Model', ($sails) ->

    class Model

      $url: '/'
      $prefix: 'api/'
      $resource: 'items'

      $path: -> "#{@$url}#{@$prefix}#{@$resource}"
      $unique: -> "#{@$path()}/#{@id}"

      $ignored: ['createdAt', 'updatedAt']

      constructor: (attributes) ->
        @$_apply attributes

        $sails.on @$resource, ->
          console.log 'hi', arguments


      $get: ->
        return unless @id

        $sails
          .get @$unique()
          .then (response) -> response.data


      $save: ->
        $sails
          .put @$unique(), @$_attributes()
          .then (response) -> response.data


      $_apply: (attributes) ->
        @[key] = value for key,value of attributes


      $_attributes: ->
        keys = Object.keys(@).filter (key) =>
          key.substring(0,1) isnt '$' and key not in @$ignored

        attributes = {}
        attributes[key] = @[key] for key in keys
        attributes
