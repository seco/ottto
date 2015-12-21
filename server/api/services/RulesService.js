module.exports = {

  match: function(params, next) {

    // Find rule conditions that match the module/attribute
    // RuleConditions
    //   .find({
    //     module: params.module,
    //     attribute: params.attribute
    //   })
    //   .then(function(conditions) {
    //     var rules = _.chain(conditions)
    //           .filter(function(condition) {
    //             console.log(condition);

    //             return true;
    //           })
    //           .map(conditions, function(condition) {
    //             return Rules.find({ id: condition.rule })
    //           })
    //           .uniq()
    //           .value();


    //     // Check to see if they match the rule criteria
    //   });
  },

  execute: function(rules) {
    // Execute the rule logic for a given rule(s)
  }

};