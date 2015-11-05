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
<<<<<<< HEAD

## 2. Creating base structure

### 2.1 Copy assets to src/ folder

Copy the assets to the project

```
$ curl VENDOR_CSS_URL src/vendor.css
$ curl MUSIC_CSS_URL src/app/music.css
$ curl MUSIC_HTML_URL src/app/music.html
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
