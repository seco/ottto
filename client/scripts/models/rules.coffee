angular.module('otttoApp')
  .factory 'Rules', (ActiveRecord) ->

    ActiveRecord.extend

      $urlRoot: '/rules'

      $defaults:
        name: 'New Rule'
        operator: '&&'
        conditions: []
        actions: []