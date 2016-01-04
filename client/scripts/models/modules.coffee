angular
  .module 'OtttoApp'
  .factory 'Module', [
    'Model'
    (Model) ->

      class Module extends Model

        $resource: 'modules'

  ]

angular
  .module 'OtttoApp'
  .factory 'Modules', [
    'Collection', 'Module'
    (Collection, Module) ->

      class Modules extends Collection

        $model: Module

      new Modules

  ]