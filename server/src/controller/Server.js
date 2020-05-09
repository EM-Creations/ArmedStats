const ServerUtils = require('../lib/ServerUtils.js');
const Boom = require('@hapi/boom');


/**
 * @class Server controller.
 * @module controller/Server
 * @author Edward McKnight (EM-Creations.co.uk)
 * @example <caption>handler: ServerController.list</caption>
 */

exports.list = async (req, h) => {
  const data = await ServerUtils.getServerModel().findAndCountAll();

  var response = [];
  if (!data) {
    throw Boom.internal('There was an error retrieving your data.');
  } else {
    if (data.count > 0) {
      const servers = data.rows.map(x => x.toJSON());

      response = {
        message: "Servers retrieved successfully.",
        servers: servers
      };
    }
  }

  return response;
}

exports.get = async (req, h) => {
  const idToFind = req.params.id;
  const data = await ServerUtils.getServerModel().findByPk(idToFind);

  var response = {};
  if (!data) {
    throw Boom.notFound('Server not found.');
  } else {
    response = {
      message: "Server retrieved successfully.",
      server: data.toJSON()
    };
  }

  return response;
}

exports.create = async (req, h) => {
  const serverData = {
    name: req.payload.name,
    ip: req.payload.ip,
    port: req.payload.port
  };

  const data = await ServerUtils.getServerModel().create(serverData);

  var response = {};
  if (!data) {
    throw Boom.internal('Could not create Server.');
  } else {
    response = {
      message: "Server created successfully.",
      server: data.toJSON()
    };
  }

  return response;
}

exports.update = async (req, h) => {
  const idToFind = req.params.id;
  const server = await ServerUtils.getServerModel().findByPk(idToFind);

  var response = {};

  if (!server) {
    throw Boom.notFound('Server not found.');
  } else {
    server.name = req.payload.name;
    server.ip = req.payload.ip;
    server.port = req.payload.port;

    const data = await server.save();

    if (!data) {
      throw Boom.internal('Could not update Server.');
    } else {
      response = {
        message: "Server updated successfully.",
        server: data.toJSON()
      };
    }
  }

  return response;
}

exports.remove = async (req, h) => {
  const idToFind = req.params.id;
  const server = await ServerUtils.getServerModel().findByPk(idToFind);

  var response = {};
  if (!server) {
    throw Boom.notFound('Server not found.');
  } else {
    const data = server.destroy();

    if (!data) {
      throw Boom.internal('Could not delete Server.');
    } else {
      response = {
        message: "Server deleted successfully."
      };
    }
  }

  return response;
}
