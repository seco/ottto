angular.module('OtttoApp')
  .factory 'Rules', (ActiveRecord, RuleConditions) ->

    ActiveRecord.extend

      $urlRoot: '/api/rules'

      $defaults:
        name: 'New Rule'
        operator: '&&'
        conditions: []
        actions: []

      $readFilters:
        conditions: (conditions) ->
          new RuleConditions condition for condition in conditions