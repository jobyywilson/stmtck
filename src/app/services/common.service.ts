import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  configUrl = 'assets/content-index.json';

  postInfo : any = [];
  eventsInfo : any = [];
  obituariesInfo : any = [];
  private contentPromise?: Promise<{posts: any[], obituaries: any[]}>;

  constructor(private http: HttpClient) { }


  getPostedInfo(){
    return this.doGet(this.configUrl);
  }

  getContent(): Promise<{posts: any[], obituaries: any[]}> {
    if (!this.contentPromise) {
      this.contentPromise = this.getPostedInfo().toPromise()
        .then((data: any) => this.mapPostedInfo(data))
        .catch((error: any) => {
          this.contentPromise = undefined;
          throw error;
        });
    }
    return this.contentPromise;
  }

  doGet(url:string){
    return this.http.get<any>(url);
  }

  async getEventsInfo(){
    const content = await this.getContent();
    return JSON.stringify(content.posts);
  }

  async loadInfo(){
    await this.getContent();
  }

  async mapPostedInfo(data:any){
    this.postInfo = [];
    this.eventsInfo = [];
    this.obituariesInfo = [];
    let eventPath = "src/assets/content/events/";
    let postsPath = "src/assets/content/posts/";
    let obituariesPath = "src/assets/content/obituaries/";
    const loadedItems = await Promise.all(data["tree"].map(async (file: any) => {
      const fileName = file.path;
      const rawData = await this.doGet(fileName.replace("src/", "")).toPromise();

      if (fileName.includes(eventPath)) return { type: 'event', value: this.mapEvent(rawData, fileName) };
      if (fileName.includes(postsPath)) return { type: 'post', value: this.mapPost(rawData, fileName) };
      if (fileName.includes(obituariesPath)) return { type: 'obituary', value: this.mapObituaries(rawData, fileName) };
      return undefined;
    }));

    for (const item of loadedItems) {
      if (item?.type === 'event') this.eventsInfo.push(item.value);
      if (item?.type === 'post') this.postInfo.push(item.value);
      if (item?.type === 'obituary') this.obituariesInfo.push(item.value);
    }
    this.postInfo.push(...this.eventsInfo);
    this.postInfo = this.postInfo.sort(function (left :any, right: any) {
      let leftTime = left.time ? left.time:left.publishedAt;
      let rightTime = right.time ? right.time:right.publishedAt;
      return -(moment(leftTime).diff(moment(rightTime)))
    });
    this.obituariesInfo = this.obituariesInfo.sort(function (left :any, right: any) {
      return (moment(right.funeralAt).diff(moment(left.funeralAt)))
    });

    localStorage.setItem('posts', JSON.stringify(this.postInfo));
    localStorage.setItem('obituaries', JSON.stringify(this.obituariesInfo));
    return {"posts":this.postInfo,"obituaries":this.obituariesInfo}
  }

  mapDate(rawDate:any){
    let monthName = moment(rawDate).format('MMMM');
    let day = moment(rawDate).format('DD');
    let year = moment(rawDate).format('YYYY');
    return `${monthName} ${day}, ${year}`
  }

  mapObituaries(obituaryRawData:any,fileName:any){
    obituaryRawData.featuredImage = 'assets/static'+obituaryRawData.featuredImage;
    obituaryRawData.funeralAt = this.mapDate(obituaryRawData.funeralAt)
    obituaryRawData.filePath = fileName
    obituaryRawData.url = "events/obituaries/"+fileName.replace("src/assets/content/obituaries/","");
    obituaryRawData.galleryImages=[]
    return obituaryRawData
  }

  mapEvent(eventRawData:any,fileName:any){
    eventRawData.featuredImage = 'assets/static'+eventRawData.featuredImage;
    eventRawData.date = this.mapDate(eventRawData.time)
    eventRawData.filePath = fileName
    eventRawData.url = "events/event/"+fileName.replace("src/assets/content/events/","");
    eventRawData.galleryImages=[]
    return eventRawData
  }


  mapPost(postRawData:any,fileName:any){
  
    postRawData.featuredImage = 'assets/static'+postRawData.featuredImage;
    postRawData.date = this.mapDate(postRawData.publishedAt)
    postRawData.filePath = fileName
    postRawData.url = "events/posts/"+fileName.replace("src/assets/content/posts/","");
    let galleryImages=[]
    if(postRawData.galleryImages){
      for(let image of postRawData.galleryImages){
        galleryImages.push("assets/static"+image)
      }
    }

    postRawData.galleryImages=galleryImages
    return postRawData
  }

  mapOfficers(officeRawData:any){
    let rawData = officeRawData["members"]
    rawData.map((obj:any)=> obj.image = "assets/static"+obj.image)
    return rawData;
  }

  public readFile(path :string): Observable<any> {
    return this.http.get(path);
  }
}
