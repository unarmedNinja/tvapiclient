import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Episode } from "../models/episode";
import { EpisodeService } from "../services/episode.service";


import { Show } from "../models/show";


import * as _ from 'lodash';



@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  episodes : Episode[];
  episodeString : string;
  shows : Show[];
  sortedEpisodes: _.Dictionary<Episode[]>;
  episodeKeys : String[];

  constructor(private episodeService : EpisodeService) {     
  }

  ngOnInit() {    
    this.getEpisodes();
  }

  getEpisodes(): void {
    //  this.episodeService.getEpisodesTest().subscribe(ep => this.episodes = ep);  
    this.episodeService.getRecentEpisodes().subscribe(ep => this.sortEpisodes(ep));
  }


  sortEpisodes(episodes: Episode[]) : void {
      var eps: _.Dictionary<Episode[]> = _.groupBy(episodes, 'formattedDate');
      console.log("sorted: ", eps);
      this.episodes = episodes;
      this.episodeKeys = Object.keys(eps).sort();
      this.sortedEpisodes = eps;
  }

  addEpisodes(showId : number) : void {
    this.episodeService.addEpisodes(showId).subscribe(episodes => console.log("retreieved episodes: ", episodes));
  }



  setEpisodes(episodes) : void {
    this.episodes = episodes;          
  }

  setShows() : void {
    this.shows = JSON.parse(localStorage.getItem("shows"));   
  }

  getShowName(showId : number) : String {    
    this.setShows();

    if(!showId){
      return;
    }
    var show = _.find(this.shows, function(show : Show) {       
      return show.id === showId 
    });
    if(show){
      return show.name;
    }
    else{
       return showId.toString();
    } 
  }


}
 