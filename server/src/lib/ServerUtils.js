const HapiSequelize = require('hapi-sequelizejs');

/**
 * @module lib/ServerUtils
 * @author Edward McKnight (EM-Creations.co.uk)
 */

/**
 * @class ServerUtils
 * @author Edward McKnight (EM-Creations.co.uk)
 * @returns A Server model object for the current server.
 * @example <caption>ServerUtils.getServerModel()</caption>
 */
exports.getServerModel = function() {
  const db = HapiSequelize.instances.getDb();
  return db.getModel("Server");
}
