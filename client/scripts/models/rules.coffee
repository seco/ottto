angular
  .module 'OtttoApp'
  .factory 'Rules', [
    'ActiveRecord', 'RuleConditions'
    (ActiveRecord, RuleConditions) ->

      ActiveRecord.extend

        $urlRoot: '/api/rules'

        $defaults:
          name: 'New Rule'
          operator: '&&'
          conditions: []
          actions: []

        # $readFilters:
        #   conditions: (conditions) ->
        #     new RuleConditions condition for condition in conditions

        # $writeFilters:
        #   conditions: (conditions) ->
        #     for condition in conditions
        #       if typeof condition.rule is 'object'
        #         condition.rule = condition.rule.id
        #     conditions

        #   module: (module) ->
        #     module.id or module

  ]
