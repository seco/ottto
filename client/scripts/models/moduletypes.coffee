angular
  .module 'OtttoApp'
  .factory 'ModuleType', (Model) ->

    class ModuleType extends Model

      $resource: 'moduletypes'


angular
  .module 'OtttoApp'
  .factory 'ModuleTypes', (Collection, ModuleType) ->

    class ModuleTypes extends Collection

      $model: ModuleType

    new ModuleTypes