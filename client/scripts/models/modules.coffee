angular.module('otttoApp')
  .factory 'Modules', (ActiveRecord, ModuleTypes) ->

    ActiveRecord.extend

      $urlRoot: '/modules'