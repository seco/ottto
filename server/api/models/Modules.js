module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    address: {
      type: 'string',
      ip: true
    },

    type: {
      model: 'ModuleTypes'
    },

    group: {
      model: 'ModuleGroups'
    },

    values: {
      type: 'json'
    }
  }

};
