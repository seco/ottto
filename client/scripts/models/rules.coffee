angular.module('otttoApp')
  .factory 'Rules', (ActiveRecord) ->

    ActiveRecord.extend

      $urlRoot: '/rules'