'use strict'

class BaseService
  constructor: ->
    console.log 'base'

  test: ->
    console.log 'tested base'

  fetch: ->
    console.log 'fetched'

###*
 # @ngdoc service
 # @name otttoApp.Modules
 # @description
 # # Modules
 # Service in the otttoApp.
###
angular.module('otttoApp')
  .service 'ModulesService', ->

    class ModulesService extends BaseService
      constructor: ->
        console.log 'modules'

      test: ->
        console.log 'tested modules'

