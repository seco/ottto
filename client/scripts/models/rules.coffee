angular.module('OtttoApp')
  .factory 'Rules', (ActiveRecord) ->

    ActiveRecord.extend

      $urlRoot: '/api/rules'

      $defaults:
        name: 'New Rule'
        operator: '&&'
        conditions: []
        actions: []