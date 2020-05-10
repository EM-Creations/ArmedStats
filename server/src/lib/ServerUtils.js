const HapiSequelize = require('hapi-sequelizejs');

/**
 * @module lib/ServerUtils
 * @author Edward McKnight (EM-Creations.co.uk)
 */

/**
 * getServerModel
 * @author Edward McKnight (EM-Creations.co.uk)
 * @returns A Server model object for the current server.
 * @example <caption>ServerUtils.getServerModel()</caption>
 */
exports.getServerModel = function() {
  return this.getModel("Server");
}

/**
 * getAuthorModel
 * @author Edward McKnight (EM-Creations.co.uk)
 * @returns An Author model object for the current server.
 * @example <caption>ServerUtils.getAuthorModel()</caption>
 */
exports.getAuthorModel = function() {
  return this.getModel("Author");
}

/**
 * getServerReportModel
 * @author Edward McKnight (EM-Creations.co.uk)
 * @returns A ServerReport model object for the current server.
 * @example <caption>ServerUtils.getServerReportModel()</caption>
 */
exports.getServerReportModel = function() {
  return this.getModel("ServerReport");
}

/**
 * getModel
 * @author Edward McKnight (EM-Creations.co.uk)
 * @params model Name of the model.
 * @returns A model for the current server.
 * @example <caption>ServerUtils.getDB()</caption>
 */
exports.getModel = function (model) {
  return this.getDB().getModel(model);
}

/**
 * getDB
 * @author Edward McKnight (EM-Creations.co.uk)
 * @returns A database instance object for the current server.
 * @example <caption>ServerUtils.getDB()</caption>
 */
exports.getDB = function() {
  return HapiSequelize.instances.getDb();
}
