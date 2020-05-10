'use strict';

const ServerUtils = require('./ServerUtils.js');
const ServerQuery = require('./ServerQuery.js');

/**
 * @class ServerReporter to report on servers.
 * @module lib/ServerReporter
 * @author Edward McKnight (EM-Creations.co.uk)
 * @example <caption>ServerQuery.build("127.0.0.1", 2302).then((serverQuery) => {
 *  console.log(serverQuery.getCurrentPlayers() + "/" + serverQuery.getMaxPlayers());
 * });</caption>
 */
module.exports = class ServerReporter {

  async runReports() {
    console.log("Running server report..");

    const servers = await ServerUtils.getServerModel().findAndCountAll();

    if (servers) {
      if (servers.count > 0) {
        console.log("Querying " + servers.count + " game servers..");

        servers.rows.forEach(server => {
          ServerQuery.build(server.ip, server.port).then((serverQuery) => {
            console.log(server.name + ":");
            console.log(serverQuery.getCurrentPlayers() + "/" + serverQuery.getMaxPlayers());

            // TODO: Determine if the current map and mission have been seen before, if they haven't add them!
            const serverReportData = {
              ping: serverQuery.getPing(),
              playerCount: serverQuery.getCurrentPlayers()
            };

            const serverReportModel = ServerUtils.getServerReportModel();
            const serverReport = serverReportModel.create(serverReportData).then((record) => {
              record.setServer(server);
            });
          }).catch((error) => {
            console.log("Unable to query server (" + server.name + ")");
          });
        });
      }
    }
  }

}
