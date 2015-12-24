angular
  .module 'OtttoApp'
  .service 'Collection', (Model, $sails) ->

    class Collection

      $model: Model
      $items: []


      constructor: (items) ->
        @$_apply items

        $sails.on @$resource, @$_respond


      $get: ->
        $sails
          .get @$model::$path()
          .then (response) => @$_apply response.data


      $add: (item) ->
        model = if item instanceof @$model then item else new @$model item
        @$items.push model


      $remove: (id) ->
        @$items = @$items.filter (item) -> item.id isnt id


      $_apply: (data) ->
        if data then @$items = data.map (item) => new @$model item


      $_respond: (message) ->
        switch message.verb
          when 'created' then @$add message.data
          when 'destroyed' then @$remove message.id