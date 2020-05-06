const HapiSequelize = require('hapi-sequelizejs');
const Boom = require('@hapi/boom');

/**
 * @class Server controller.
 * @module controller/Server
 * @author Edward McKnight (EM-Creations.co.uk)
 * @example <caption>handler: ServerController.list</caption>
 */

exports.list = async (req, h) => {
  const db = HapiSequelize.instances.getDb();
  const Server = db.getModel("Server");

  const data = await Server.findAndCountAll();

  var response = [];
  if (!data) {
    throw Boom.internal('There was an error retrieving your data.');
  } else {
    if (data.count > 0) {
      response = data.rows;
    }
  }

  return response;
}
