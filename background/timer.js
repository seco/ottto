var _ = require('underscore'),
    CronJob = require('cron').CronJob;

Modules
  .find({
    type: 'timer'
  })
  .done(function(error, modules) {
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