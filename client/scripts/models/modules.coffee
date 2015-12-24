angular
  .module 'OtttoApp'
  .factory 'Module', (Model) ->

    class Module extends Model

      $resource: 'modules'


angular
  .module 'OtttoApp'
  .factory 'Modules', (Collection, Module) ->

    class Modules extends Collection

      $model: Module