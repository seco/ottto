angular
  .module 'OtttoApp'
  .factory 'ModuleGroups', [
    'ActiveRecord'
    (ActiveRecord) ->

      ActiveRecord.extend

        $urlRoot: '/api/modulegroups'

  ]