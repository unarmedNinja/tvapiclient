import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Episode } from "../models/episode";
import { EpisodeDay } from "../models/episodeDay";
import { EpisodeService } from "../services/episode.service";


import { Show } from "../models/show";

import * as _ from 'lodash';
import * as moment from 'moment';
import { unitOfTime } from 'moment';

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
  week: String[];
  episodeDays: EpisodeDay[];
  lastWeekEpisodes : EpisodeDay[];
  thisWeekEpisodes : EpisodeDay[];
  nextWeekEpisodes: EpisodeDay[];

  constructor(private episodeService : EpisodeService) {     
  }

  ngOnInit() {    
    this.getEpisodes();
    this.week = ["a"];
    this.episodeDays = [new EpisodeDay];
    
  }

  getEpisodes(): void {
    //  this.episodeService.getEpisodesTest().subscribe(ep => this.episodes = ep);  
    this.episodeService.getRecentEpisodes().subscribe(ep => this.sortEpisodes(ep));
  }


  sortEpisodes(episodes: Episode[]) : void {
      var filteredList : Episode[] = _.filter(episodes, function(e: Episode) { 
        return e.absoluteNumber > 0 && (moment().format("YYYY-MM-DD") !== e.formattedDate);
      });
      var eps: _.Dictionary<Episode[]> = _.groupBy(filteredList, 'formattedDate');
      console.log("sorted: ", eps);
      this.episodes = episodes;
      this.episodeKeys = Object.keys(eps).sort();
      this.sortedEpisodes = eps;
      this.setWeek();
  }

  addEpisodes(showId : number, page: number) : void {
    this.episodeService.addEpisodes(showId, page).subscribe(episodes => console.log("retreieved episodes: ", episodes));
  }

  deleteEpisode(showId: number) : void {
    this.episodeService.deleteEpisodes(showId).subscribe(res => console.log("deleted episodes: ", res));
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

  setWeek() : void {   
    var StartDay = moment().startOf('week');
    var day=StartDay.format("dddd, MMMM Do ");

    var StartDay2 = moment().startOf('week');
    
    this.week[0] = StartDay2.format("dddd, MMMM Do");
    this.episodeDays = this.getEpisodesForWeek(0);
    this.lastWeekEpisodes = this.getEpisodesForWeek(-7);
    this.nextWeekEpisodes = this.getEpisodesForWeek(7);

    console.log(this.week);
  }

  getEpisodesForWeek(diff : number) : EpisodeDay[] {
    var StartDay = moment().startOf('week');
    var epWeek : EpisodeDay[] = [new EpisodeDay];
    StartDay.add(diff, "d");
    
    epWeek[0].day = StartDay.format("MMMM Do");
    epWeek[0].episodes = this.sortedEpisodes[StartDay.format("YYYY-MM-DD")];

    for(var i = 1; i<7;i++){
      StartDay.add(1, 'd');
      epWeek[i] = new EpisodeDay();
      epWeek[i].day = StartDay.format("MMMM Do");
      epWeek[i].episodes = this.sortedEpisodes[StartDay.format("YYYY-MM-DD")];
    }

    console.log("EP WEEK: ", epWeek);
    return epWeek;
  }

}
 