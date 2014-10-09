angular.module('OtttoApp')
  .factory 'ModuleTypes', (ActiveRecord) ->

    ActiveRecord.extend

      $urlRoot: '/moduletypes'