angular.module('otttoApp')
  .factory 'ModuleGroups', (ActiveRecord) ->

    ActiveRecord.extend

      $urlRoot: '/modulegroups'