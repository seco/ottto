angular
  .module 'OtttoApp'
  .service 'Collection', (Model, $sails) ->

    class Collection

      $model: Model

      $get: ->
        $sails.on @$resource, ->
          console.log 'hi', arguments

        $sails
          .get @$model::$path()
          .then (response) => @$apply response.data


      $apply: (data) ->
        @items = data.map (item) => new @$model item