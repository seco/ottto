angular.module('otttoApp')
  .factory 'Module', (ActiveRecord) ->

    ActiveRecord.fetch = (id) ->
      $object = {}

      if id
        @fetchOne(id).then (module) ->
          $object = module

      else
        @fetchAll().then (modules) =>
          $object = modules

      $object



    ActiveRecord.extend

      $urlRoot: '/modules'
