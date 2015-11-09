import {bootstrap} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {MusicApp} from './app/music';

bootstrap(MusicApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
