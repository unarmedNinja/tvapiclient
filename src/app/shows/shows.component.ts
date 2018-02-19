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
    this.showService.getShows().subscribe(shows => this.showComplete(shows));
  }

  showComplete(shows): void {    
    this.shows = shows; 
    localStorage.setItem("shows", JSON.stringify(shows));
  }

  add(name: string, id : number): void {
    name = name.trim();
    if (!name) { return; }

    this.showService.addShow({ name, id } as Show)
      .subscribe(show => {
        this.shows.push(show);
      });
  }
}
