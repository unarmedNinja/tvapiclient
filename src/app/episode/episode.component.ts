import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episode } from "../models/episode";
import { EpisodeService } from "../services/episode.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {  
  episodes : Episode[];
  showId : number;

  constructor(private route: ActivatedRoute, private episodeService: EpisodeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.showId = +params['showId'] || 0; // (+) converts string 'id' to a number
      this.getEpisodes(this.showId);      
   });
    
  }

  getEpisodes(showId : number): void {
    //  this.episodeService.getEpisodesTest().subscribe(ep => this.episodes = ep);  
    this.episodeService.getEpisodesByShowId(showId).subscribe(ep => this.sortEpisodes(ep));
  }

  sortEpisodes(episodes: Episode[]) : void {        
    var sortedEpisodes = _.sortBy(episodes, ['absoluteNumber','airedSeason','airedEpisodeNumber']);
    console.log("sorted: ", sortedEpisodes);
    this.episodes = sortedEpisodes;    
  }

}
