import { Injectable } from '@angular/core';
import { IServer } from '../interfaces/server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  servers: IServer[] = [
    {
      "id": 1,
      "name": "The Bear Cave",
      "ip": "localhost"
    },
    {
      "id": 2,
      "name": "The Bear Cave DEV",
      "ip": "127.0.0.1"
    }
  ];

  constructor() { }

  getServers(): IServer[] {
    return this.servers;
  }
}
