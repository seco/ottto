angular.module('OtttoApp')
  .factory 'ModuleGroups', (ActiveRecord) ->

    ActiveRecord.extend

      $urlRoot: '/modulegroups'