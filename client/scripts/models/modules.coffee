angular.module('OtttoApp')
  .factory 'Modules', (ActiveRecord) ->

    ActiveRecord.extend

      $urlRoot: '/modules'