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
      var eps: _.Dictionary<Episode[]> = _.groupBy(episodes, 'formattedDate');
      console.log("sorted: ", eps);
      this.episodes = episodes;
      this.episodeKeys = Object.keys(eps).sort();
      this.sortedEpisodes = eps;
      this.setWeek();
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

  setWeek() : void {   
    
    var StartDay = moment().startOf('week');
    var day=StartDay.format("dddd, MMMM Do ");

    console.log("setting week: ", day); 

    var day2 = StartDay.add(1,'d').format("dddd, MMMM Do ");
    console.log("setting week day2: ", day2); 
    var day3 = StartDay.add(1,'d').format("dddd, MMMM Do ");
    var day4 = StartDay.add(1,'d').format("dddd, MMMM Do ");
    var day5 = StartDay.add(1,'d').format("dddd, MMMM Do ");
    var day6 = StartDay.add(1,'d').format("dddd, MMMM Do ");
    var day7 = StartDay.add(1,'d').format("dddd, MMMM Do ");

//    this.episodeDays[0].day = day;
 //   this.episodeDays[0].episodes = this.sortedEpisodes[day.format("dddd, MMMM Do ")]

  var StartDay2 = moment().startOf('week');
  this.week[0] = StartDay2.format("dddd, MMMM Do");
  this.episodeDays[0].day = StartDay2.format("dddd, MMMM Do");
  this.episodeDays[0].episodes = this.sortedEpisodes[StartDay2.format("YYYY-MM-DD")];

  for(var i = 1; i<7;i++){
    var aDay = StartDay2.add(1, 'd');
    this.week[i] = aDay.format("dddd, MMMM Do");
    this.episodeDays[i] = new EpisodeDay();
    this.episodeDays[i].day = aDay.format("dddd, MMMM Do");
    this.episodeDays[i].episodes = this.sortedEpisodes[aDay.format("YYYY-MM-DD")];
  }

/*
    this.week[0] = day;    
    this.week[1] = day2;
    this.week[2] = day3;    
    this.week[3] = day4;
    this.week[4] = day5;
    this.week[5] = day6;
    this.week[6] = day7;
    */
    console.log(this.week);
    
    /*

*/
  }

}
 