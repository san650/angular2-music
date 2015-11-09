import {Component, bootstrap, NgFor} from 'angular2/angular2';
import {Http} from 'angular2/http';
import {AlbumCover} from './components/album-cover/album-cover';

@Component({
  selector: 'music-app',
  providers: [],
  templateUrl: 'app/music.html',
  styleUrls: ['app/music.css'],
  directives: [NgFor,AlbumCover],
  pipes: []
})
export class MusicApp {
  albums: any = [];

  constructor(private http:Http) {
    http
      .get("/albums.json")
      .map(response => response.json()["albums"])
      .subscribe(albums => this.albums = albums)
  }
}
