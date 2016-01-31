var Promise = require('bluebird');

module.exports = {

  match: function(params) {

    return this._matchConditions(params)
      .then(this._ensureUnique)
      .then(this._matchRules)
      .then(this._populateConditions)
      .then(this._validateRules)
      .then(this._executeRules);

  },


  _matchConditions: function(params) {

    return RuleConditions
      .find({
        module: params.module,
        attribute: params.attribute
      });

  },


  _ensureUnique: function(conditions) {

    return _.unique(conditions, 'rule');

  },


  _matchRules: function(conditions) {

    return Promise
      .map(conditions, function(condition) {

        return Rules
          .findOne(condition.rule)
          .populate('conditions');

      });

  },


  _populateConditions: function(rules) {

    return Promise
      .map(rules, function(rule) {

        return RuleConditions
          .find({ rule: rule.id })
          .populateAll()
          .then(function(conditions) {
            return _.extend({}, rule, { conditions: conditions });
          });

      });

  },


  _validateRules: function(rules) {

    return rules.filter(this._validateRule);

  },

  _validateRule: function(rule) {

    var method = rule.operator == '&&' ? 'every' : 'some';

    return _[method](rule.conditions, this._validateCondition);

  },


  _validateCondition: function(condition) {

    var logic = condition.module.values[condition.attribute] +
          ' ' +
          condition.operator +
          ' ' +
          condition.arguments[0] +
          ';';

    return eval(logic);

  },


  _executeRules: function(rules) {

    rules.forEach(this._executeRule);

    return rules;

  },


  _executeRule: function(rule) {

    return rule.actions.forEach(this._executeAction);

  },


  _executeAction: function(action) {

    var find = { id: action.module },
        props = { values: {} };

    props.values[action.attribute] = action.arguments[0];

    return ModulesService
      .update(action.module, props);

  }


};