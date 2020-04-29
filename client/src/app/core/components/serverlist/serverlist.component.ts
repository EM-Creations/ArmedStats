import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { IServer } from '../../interfaces/server';

@Component({
  selector: 'app-serverlist',
  templateUrl: './serverlist.component.html',
  styleUrls: ['./serverlist.component.styl'],
  providers: [ServerService]
})
export class ServerListComponent implements OnInit {
  servers : IServer[];
  filteredServers : IServer[];
  _searchText : string;

  constructor(private serverService: ServerService) {
    this.searchText = "";
  }

  ngOnInit(): void {
    this.servers = this.serverService.getServers();
    this.filteredServers = this.servers;
  }

  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
    this.filteredServers = this.searchText ? this.performFilter(this.searchText) : this.servers;
  }

  performFilter(filterBy: string): IServer[] {
    return this.servers.filter((server: IServer) =>
      this.containsSubString(server.name, filterBy)
    );
  }

  containsSubString(search: string, find: string): boolean {
    search = search.toLocaleLowerCase();
    find = find.toLocaleLowerCase();

    return search.indexOf(find) !== -1;
  }

}
