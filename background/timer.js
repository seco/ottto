var _ = require('lodash'),
    CronJob = require('cron').CronJob;

Modules
  .find({
    type: 'timer'
  })
  .exec(function(error, modules) {
    _(modules).each(function(module) {
      Rules
        .find({
          inputId: module.id
        })
        .exec(function foundCrons(error, rules) {
          _(rules).each(function createCron(rule) {

            new CronJob(
              rule.event,
              function cronExecute() {
                rule.do();
              },
              function cronDestruct() {},
              true
            );

          });
        });
    });
  });
