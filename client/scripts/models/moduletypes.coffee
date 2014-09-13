angular.module('otttoApp')
  .factory 'ModuleTypes', (ActiveRecord) ->

    ActiveRecord.extend

      $urlRoot: '/moduletypes'