# Overview

These repo contains the materials and the experiments I did while preparing an Angular 2 workshop. It's now defunc, instead take a look at https://github.com/san650/angular-workshop-meetup-2015-11

---

# Angular 2.0 with angular-cli

Disclaimer: Angular 2.0 and `angular-cli` are in alpha releases. So things will
break!

## 0. Pre-requisites

* [Node](https://nodejs.org/download/release/v4.1.1/) >= v4.1.0

You can test which version of node you have on a terminal

```
$ node -v
v4.1.1
```

## 1. angular-cli

`angular-cli` provides a tooling for Angular 2.0 projects. Some of the highlights:

* Defines a project structure based on conventions using best practices
* Development server
* Test runner
* Blueprints (generators) for components, services, pipes and tests
* Addons

### 1.1 Install angular-cli tool

Install `angular-cli` tool

```
$ npm install -g angular-cli
$ ng --version
version: 1.13.8
node: 4.1.1
npm: 2.14.9
os: darwin x64
```

### 1.2 Generate new Angular 2.0 project

Generate the Angular 2.0 application using the `ng` command and start the
development server.

```
$ ng new music
$ cd music/
$ ng serve
```

Note that on Windows you need to start the development server using Admin
permissions [1](https://github.com/angular/angular-cli#known-issues).

## 2. Creating base structure

### 2.1 Copy assets to src/ folder

Copy the assets to the project

```
$ curl VENDOR_CSS_URL src/vendor.css
$ curl MUSIC_CSS_URL src/app/music.css
$ curl MUSIC_HTML_URL src/app/music.html
$ copy IMAGES/ src/images/
```

### 2.2 Link vendor.css

Include `vendor.css` in `src/index.html` file

```html
<link rel="stylesheet" type="text/css" href="vendor.css">
```

### 2.3 Reference to component's CSS file

Tell `music` component to load it's CSS file. This is done by passing the
`styleUrls` parameter to the component definition.

```js
@Component({
...
styleUrls: ['app/music.css'],
...
})
```

## 3. Fetch albums from an external service

We're going to simulate an external HTTP API so we're going to fetch albums.

### 3.1 Copy dummy json file

Copy the `albums.json` to `src/` folder.

```
$ cp sources/albums.json music/src/
```

### 3.2 Register `http` dependency

We need to do a couple of steps here

1. Import angular2/http js file
2. Register the HTTP module so it can be injected in our app

For the first step we need to register the file on `index.html`

```html
<script src="vendor/angular2/bundles/http.dev.js"></script>
```

For the second step we import `HTTP_PROVIDERS` from `angular2/http` file and
then we add it as a dependency to the bootstrap.

```js
import {bootstrap} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MusicApp} from './app/music';

bootstrap(MusicApp, [HTTP_PROVIDERS]);
```

### 3.3 Load the list of albums

New template syntax

* Using `*` to prefix directives e.g. `*ng-for`
* Using `[...]` to bind attributes
* Using `(...)` to bind events
* Using `[(...)]` to do two-way bindings
* Using `#` to create local template variables

Note that in the case of events, you can use `^` sign as prefix to tell
Angular to bubble the event up the component tree.

---

Let's read the list of albums from the context and iterate using the `ngFor`
directive. Let's create it in two steps, first load the list of albums from an
array and then from a json file using the `http` service.

Change the template to generate the list of album covers

src/app/music.html

```html
<div *ng-for="#album of albums">
  <div class="col-sm-3 col-md-3 col-lg-2 media default image-grid genre">
    <a>
      <div class="genreImage" [style.background-image]="'url('+album.image+')'"></div>
    </a>
  </div>
</div>
```

And on the JavaScript side return the list of albums

src/app/music.ts

```js
import {Http} from 'angular2/http';

...

constructor(private http:Http) {
  http
    .get("/albums.json")
    .map(response => response.json()["albums"])
    .subscribe(albums => this.albums = albums)
}

...
```

More info about [`http`](https://angular.io/docs/js/latest/api/http/Http-class.html).

## 4. Components

Let's create a component that represents one album cover.

```
$ ng generate component album-cover
version: 1.13.8
installing component
  create src/app/components/album-cover/album-cover.css
  create src/app/components/album-cover/album-cover.html
  create src/app/components/album-cover/album-cover.ts
installing component-test
  create src/app/components/album-cover/album-cover.spec.ts
```

The folder structure now is

```
$ tree -I 'node_modules|dist|temp|images' src/
src/
├── albums.json
├── app
│   ├── components
│   │   └── album-cover
│   │       ├── album-cover.css
│   │       ├── album-cover.html
│   │       ├── album-cover.spec.ts
│   │       └── album-cover.ts
│   ├── music.css
│   ├── music.html
│   └── music.ts
├── app.ts
├── favicon.ico
├── index.html
├── tsconfig.json
└── vendor.css

3 directories, 13 files
```

We have to move the HTML of the album cover to `src/app/components/album-cover/album-cover.html`.

```html
<div class="col-sm-3 col-md-3 col-lg-2 media default image-grid genre">
  <a>
    <div class="genreImage" [style.background-image]="'url('+album.image+')'"></div>
  </a>
</div>
```

and on the JavaScript side of the component we have to register the properties
we want to use.

```js
@Component({
  selector: 'album-cover',
  ...
  properties: ['album']
})
export class AlbumCover {
  constructor() {}
}
```

Then we have to move the styles to the corresponding component css file. This is
because the styles are encapsulated for each component, so they won't be applied
unless they are defined on a global css file on the right component.

```css
.genres-section{
    margin-bottom: 0px;
    padding-top: 20px;
}

.media {
    margin-top: 15px !important;
    padding-right: 5px !important;
}

.media.genre .genreImage {
    padding-bottom: 100%;
    background-size: contain;
    background-repeat: no-repeat;
}

.media.genre .name {
    position: absolute;
    top: 72%;
    left: 5%;
    right: 5%;
    bottom: 0;
    text-align: center;
}

.media.genre .name span {
    color: #DFE0E6;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    border-bottom: 1px solid transparent;
}
```

Once we created the new component we can use it from the main component.

```html
<div class="row fivecolumns">
  <album-cover *ng-for="#album of albums" [album]="album"></album-cover>
</div>
```

and on the JavaScript side we have to register the component

```js
import {AlbumCover} from './components/album-cover/album-cover';

@Component({
  selector: 'music-app',
  ...
  directives: [NgFor,AlbumCover],
  ...
})
```

### 4.1 Handle click event

To handle click event you have to use the `(click)="handler()"` syntax.

```html
<div class="col-sm-3 col-md-3 col-lg-2 media default image-grid genre">
  <a>
    <div class="genreImage" [style.background-image]="'url('+album.image+')'" (click)="open()"></div>
  </a>
</div>
```

and you need to declare the attribute `model` as an attribute of the class in
order to use it from the click handler `open`.

```js
...
export class AlbumCover {
  album: any;

  constructor() {}

  open() {
    alert("You selected " + this.album.artist + " - " + this.album.album);
  }
}
```

## 5. Routes

Let's see how to use the routing facilities Angular 2.0 brings

### 5.1 Register router provider

To start using the routing facilities, we need to do a couple of things first:

1. Include the JavaScript file
2. Register the router providers in the application.

So, first we need to include the JavaScript file as follows

src/index.html

```html
...
  <script src="vendor/angular2/bundles/router.dev.js"></script>
...
```

then we have to include the providers in the application.

src/app.ts

```js
import {bootstrap} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {MusicApp} from './app/music';

bootstrap(MusicApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
```

### 5.2 Create the `albums-page` component

Generate the component and move everything to that component.

```
$ ng generate component albums-page
version: 1.13.8
installing component
  create src/app/components/albums-page/albums-page.css
  create src/app/components/albums-page/albums-page.html
  create src/app/components/albums-page/albums-page.ts
installing component-test
  create src/app/components/albums-page/albums-page.spec.ts
```

src/app/components/albums-page/albums-page.ts

```js
import {Component, NgFor} from 'angular2/angular2';
import {Http} from 'angular2/http';
import {AlbumCover} from '../album-cover/album-cover';

@Component({
  selector: 'albums-page',
  templateUrl: 'app/components/albums-page/albums-page.html',
  styleUrls: ['app/components/albums-page/albums-page.css'],
  providers: [],
  directives: [NgFor, AlbumCover],
  pipes: []
})
export class AlbumsPage {
  albums: any = [];

  constructor(private http:Http) {
    http
      .get("/albums.json")
      .map(response => response.json()["albums"])
      .subscribe(albums => this.albums = albums)
  }
}
```

src/app/components/albums-page/albums-page.html

```html
<div class="section-divider genres-section">
  <div id="featuredPlaylistLabel">
    Albums
  </div>
</div>
<div id="genresAndMoods">
  <div class="row fivecolumns">
    <album-cover *ng-for="#album of albums" [album]="album"></album-cover>
  </div>
</div>
```

```css
.genres-section{
    margin-bottom: 0px;
    padding-top: 20px;
}
```

And update src/app/music.ts (omitted) and src/app/music.html accordingly

```html
...
<albums-page></albums-page>
...
```

### 5.3 Create root route `/`

Import `RouterConfig` which allows to define the routes. Also import the router
directives to use in the templates.

First we register the root route and indicate that it should load the
`AlbumsPage` component.

src/app/music.ts

```js
...
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
...

@RouteConfig([
  {
    path:"/",
    as: "Albums",
    component: AlbumsPage
  }
])
@Component({
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class MusicApp {
...
```

And then we indicate where do we want to render the components in the template
using the `<router-outlet>` directive.

```html
<router-outlet></router-outlet>
```

and that's it. If we reload the page, the root path it's going to be load.

### 5.4 Adding a child route

First, let's add another page (component).

```
$ ng generate tracks-page
```

and copy the template and CSS.

Then register the route and make the click on the album covers to navigate to
this route.

src/app/components/album-cover/album-cover.ts

```js
...
import {Router} from 'angular2/router';

...
export class AlbumCover {
  album: any;

  constructor(private router:Router) {}

  open() {
    this.router.navigate(['Tracks']);
  }
}
```

## The end

Some resources

* [The Spotyngular Project](https://github.com/iranreyes/spotyngular) by Iran Reyes
* [The Spotyngular Project](http://uruit.com/2015/10/29/benefits-and-tricks-of-angularjs-2-the-spotyngular-project/) - A series of blog posts by Iran Reyes
* [Angular 2](https://angular.io/docs/ts/latest/) documentation
* [angular-cli](https://github.com/angular/angular-cli) github
