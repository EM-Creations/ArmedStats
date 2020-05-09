const ServerUtils = require('../lib/ServerUtils.js');
const Boom = require('@hapi/boom');


/**
 * @class Author controller.
 * @module controller/Author
 * @author Edward McKnight (EM-Creations.co.uk)
 * @example <caption>handler: AuthorController.list</caption>
 */

exports.list = async (req, h) => {
  const data = await ServerUtils.getAuthorModel().findAndCountAll();

  var response = [];
  if (!data) {
    throw Boom.internal('There was an error retrieving your data.');
  } else {
    if (data.count > 0) {
      const authors = data.rows.map(x => x.toJSON());

      response = {
        message: "Authors retrieved successfully.",
        authors: authors
      };
    }
  }

  return response;
}

exports.get = async (req, h) => {
  const idToFind = req.params.id;
  const data = await ServerUtils.getAuthorModel().findByPk(idToFind);

  var response = {};
  if (!data) {
    throw Boom.notFound('Author not found.');
  } else {
    response = {
      message: "Author retrieved successfully.",
      author: data.toJSON()
    };
  }

  return response;
}

exports.create = async (req, h) => {
  const authorData = {
    name: req.payload.name
  };

  const data = await ServerUtils.getAuthorModel().create(authorData);

  var response = {};
  if (!data) {
    throw Boom.internal('Could not create Author.');
  } else {
    response = {
      message: "Author created successfully.",
      author: data.toJSON()
    };
  }

  return response;
}

exports.update = async (req, h) => {
  const idToFind = req.params.id;
  const author = await ServerUtils.getAuthorModel().findByPk(idToFind);

  var response = {};

  if (!author) {
    throw Boom.notFound('Author not found.');
  } else {
    author.name = req.payload.name;

    const data = await author.save();

    if (!data) {
      throw Boom.internal('Could not update Author.');
    } else {
      response = {
        message: "Author updated successfully.",
        author: data.toJSON()
      };
    }
  }

  return response;
}

exports.remove = async (req, h) => {
  const idToFind = req.params.id;
  const author = await ServerUtils.getAuthorModel().findByPk(idToFind);

  var response = {};
  if (!author) {
    throw Boom.notFound('Author not found.');
  } else {
    const data = author.destroy();

    if (!data) {
      throw Boom.internal('Could not delete Author.');
    } else {
      response = {
        message: "Author deleted successfully."
      };
    }
  }

  return response;
}
