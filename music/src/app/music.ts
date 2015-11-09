import {Component} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AlbumsPage} from './components/albums-page/albums-page';

@RouteConfig([
  {
    path:"/",
    as: "Albums",
    component: AlbumsPage
  }
])
@Component({
  selector: 'music-app',
  providers: [],
  templateUrl: 'app/music.html',
  styleUrls: ['app/music.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class MusicApp {
  constructor() {
  }
}
