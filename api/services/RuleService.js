var events = require('./EventBus');

events.on('module:change', function(attribute, before, after, module) {
  RuleService.check(module)
});

module.exports = {

  check: function(module) {

    Rules.find({ })
  }
};