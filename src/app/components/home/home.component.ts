import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos:any[] = [];
  videoSel:any;

  constructor(
    private youtubeService:YoutubeService
  ) {
    this.youtubeService.getVideos().subscribe(
      data => this.videos = data
    );
   }

  ngOnInit() {

  }

  verVideo( video:any ){
    console.log("dsad");
    this.videoSel = video;
    $('#modalVideo').modal();
  }

  cerrarModal(){
    this.videoSel = null;
    $('#modalVideo').modal('hide');
  }
  
  cargarMas(){
    this.youtubeService.getVideos().subscribe(
      data => this.videos.push.apply(this.videos , data )
    );
  }

}
