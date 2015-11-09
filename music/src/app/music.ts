import {Component} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AlbumsPage} from './components/albums-page/albums-page';

@Component({
  selector: 'music-app',
  providers: [],
  templateUrl: 'app/music.html',
  styleUrls: ['app/music.css'],
  directives: [AlbumsPage],
  pipes: []
})
export class MusicApp {
  constructor() {
  }
}
