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
        this.eventsInfo.push(this.mapEvent(event,fileName))
      }
      else if(fileName.includes(postsPath)){
        let posts = await this.doGet(fileName.replace("src/","")).toPromise()
        this.postInfo.push(this.mapPost(posts,fileName))
        
      }
      else if(fileName.includes(obituariesPath)){
        let obituary = await this.doGet(fileName.replace("src/","")).toPromise()
        obituary.filePath = fileName
        obituary.url = "events/obituary/"+fileName.replace("src/assets/content/obituaries/","")
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

  mapEvent(eventRawData:any,fileName:any){
  
    let monthName = moment(eventRawData.time).format('MMMM');
    let day = moment(eventRawData.time).format('DD');
    let year = moment(eventRawData.time).format('YYYY');
    eventRawData.featuredImage = 'assets/static'+eventRawData.featuredImage;
    eventRawData.date = `${monthName} ${day}, ${year}`
    eventRawData.filePath = fileName
    eventRawData.url = "events/event/"+fileName.replace("src/assets/content/events/","")
    return eventRawData
  }
  mapPost(postRawData:any,fileName:any){
  
    postRawData.featuredImage = 'assets/static'+postRawData.featuredImage;
    postRawData.date = postRawData.publishedAt
    postRawData.filePath = fileName
    postRawData.url = "events/posts/"+fileName.replace("src/assets/content/posts/","");
    let galleryImages=[]
    for(let image of postRawData.galleryImages){
      galleryImages.push("assets/static"+image)
    }
    postRawData.galleryImages=galleryImages
    return postRawData
  }
}
