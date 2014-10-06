angular.module('otttoApp')
  .factory 'Modules', (ActiveRecord) ->

    ActiveRecord.extend

      $urlRoot: '/modules'