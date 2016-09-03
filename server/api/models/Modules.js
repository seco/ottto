module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    ip: {
      type: 'string',
      ip: true
    },

    chip: {
      type: 'string'
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
