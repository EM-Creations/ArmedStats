const ServerInstance = require('./server.js');
var CronJob = require('cron').CronJob;
const ServerReporter = require('./lib/ServerReporter.js');
var serverReporter = new ServerReporter();

const init = async () => {
  const serverInstance = new ServerInstance("prod");
  await serverInstance.init();
  await serverInstance.start();

  // SCHEDULING OF SERVER CHECKING
  const job = new CronJob("* * * * *", serverReporter.runReports);
  job.start();
};

init();
