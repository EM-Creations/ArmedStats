'use strict';

const Gamedig = require('gamedig');

/**
 * @class ServerQuery representing a query of a game server.
 * @module lib/ServerQuery
 * @author Edward McKnight (EM-Creations.co.uk)
 * @example <caption>ServerQuery.build("127.0.0.1", 2302).then((serverQuery) => {
 *  console.log(serverQuery.getCurrentPlayers() + "/" + serverQuery.getMaxPlayers());
 * });</caption>
 */
module.exports = class ServerQuery {
  ip = "";
  port = 0;
  serverState = null;

  constructor(_ip, _port, _state) {
    if (typeof _state === 'undefined') {
            throw new Error('Cannot be called directly');
    }

    this.ip = _ip;
    this.port = _port;
    this.serverState = _state;
  }

  static async build(_ip, _port) {
    var _state = await Gamedig.query({
      type: 'arma3',
      host: _ip,
      port: _port,
    });
    return new ServerQuery(_ip, _port, _state);
  }

  getCurrentPlayers() {
    return this.serverState.players.length;
  }

  getMaxPlayers() {
    return this.serverState.maxplayers;
  }

  getPing() {
    return this.serverState.ping;
  }

}
