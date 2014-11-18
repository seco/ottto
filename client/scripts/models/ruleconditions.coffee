angular.module('OtttoApp')
  .factory 'RuleConditions', (ActiveRecord) ->

    ActiveRecord.extend

      $urlRoot: '/api/ruleconditions'

      $defaults:
        rule: 0
        module: 0
        attribute: ''
        arguments: []