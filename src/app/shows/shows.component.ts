import { Component, OnInit } from '@angular/core';
import { Show } from "../models/show";
import { ShowService } from "../services/show.service";

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  show: Show = {
    id: 1,
    name: 'Arrow'
  };

  shows : Show[];

  constructor(private showService : ShowService) { }

  ngOnInit() {
    this.getShows();
  }

  getShows(): void {
    this.showService.getShows().subscribe(shows => this.shows = shows);;
  }

}
