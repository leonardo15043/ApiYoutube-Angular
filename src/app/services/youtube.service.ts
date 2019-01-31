import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { HttpParams , HttpClient} from  "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl:string = "https://www.googleapis.com/youtube/v3";
  private apikey:string = "AIzaSyDqCwC3nwUASUfpeAvI_yi8tXxqwC4TsA0";
  private playlist:string = "UUw7Bz6EHxlnOoBUBlJZCWCw";
  private nextPageToken:string = "";

  constructor(
    public http:HttpClient
  ) { }

  getQuery( query: string , params:HttpParams ){
     const url = `${ this.youtubeUrl }${ query }`;
     return this.http.get(url, { params });
  }

  getVideos(){

      const query = '/playlistItems';
      let params = new HttpParams()
            .set( 'part','snippet')
            .set( 'maxResults','10')
            .set( 'playlistId', this.playlist )
            .set( 'key', this.apikey )
            .set( 'pageToken' , this.nextPageToken  );



      console.log(params);

      return this.getQuery(query , params)
        .pipe(map( data =>{

            this.nextPageToken = data.nextPageToken;
            return data['items'];
        }));
  }

}
