import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { combineLatest } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  configUrl = 'https://api.github.com/repos/jobyywilson/stmtck/git/trees/master?recursive=1';

  postInfo : any = [];
  eventsInfo : any = [];
  obituariesInfo : any = [];

  constructor(private http: HttpClient) { }

  getPostedInfo(){
    return this.doGet(this.configUrl);
  }

  doGet(url:string){
    return this.http.get<any>(url);
  }

  async getEventsInfo(){
    let events = localStorage.getItem('events');
    if(!events){
      await this.loadInfo();
    }
    return localStorage.getItem('events');
  }

  async loadInfo(){
    let combinedData = [this.getPostedInfo()]
    combineLatest(combinedData).subscribe(
      data => {
        this.mapPostedInfo(data[0]);
      },
    (err:any) => console.error(err)
    );

    

  }

  async mapPostedInfo(data:any){
    let eventPath = "src/assets/content/events/";
    let postsPath = "src/assets/content/posts/";
    let obituariesPath = "src/assets/content/obituaries/";
    for(let file of data["tree"]){
      let fileName = file.path;
      
      if(fileName.includes(eventPath)){
        let event = await this.doGet(fileName.replace("src/","")).toPromise()
        let monthName = moment(event.time).format('MMMM');
        let day = moment(event.time).format('DD');
        let year = moment(event.time).format('YYYY');
        event.featuredImage = 'assets/static'+event.featuredImage;
        event.date = `${monthName} ${day}, ${year}`
        this.eventsInfo.push(event)
      }
      else if(fileName.includes(postsPath)){
        let posts = await this.doGet(fileName.replace("src/","")).toPromise()
        this.postInfo.push(posts)
        
      }
      else if(fileName.includes(obituariesPath)){
        let obituary = await this.doGet(fileName.replace("src/","")).toPromise()
        this.obituariesInfo.push(obituary)
      }
    }
    this.eventsInfo = this.eventsInfo.sort(function (left :any, right: any) {
      return (moment(left.time).diff(moment(right.time)))
    });
    this.postInfo = this.postInfo.sort(function (left :any, right: any) {
      return -(moment(left.publishedAt).diff(moment(right.publishedAt)))
    });
    this.obituariesInfo = this.obituariesInfo.sort(function (left :any, right: any) {
      return -(moment(left.funeralAt).diff(moment(right.funeralAt)))
    });

    localStorage.setItem('posts', JSON.stringify(this.postInfo));
    localStorage.setItem('events', JSON.stringify(this.eventsInfo));
    localStorage.setItem('obituaries', JSON.stringify(this.obituariesInfo));
  
  }
}
