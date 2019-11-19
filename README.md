# DNA custom layout
A central repositoy acting as a staging area for all components and custom projects


## Requirements
- Image magick
- Image optim app

Run other installs with `npm install`


## Processing and optimising images
Most projects make use of a responsive image component, using a placeholder gradient from the images dominant color.

### How to generate images versions and get image data:

- Crop the images at a resolution greater than the max size used. I recommned images palced in Photoshop with named layers, then File / Export / Export layers to files
- Place the output files into `src/content/images/_RAW`
- Be sure to set image size options in `images.config.json`
- From the terminal, run `npm run images`
- Additional options that take either true or false values (default is true)
 - `rename` This is to rename files from the Photoshop worrkflow above to match their original layer names
 - `thumbs` Whether to generate image thumbnails including blurred versions
 - `colors` Whether to extract image color values
 

## Components v layouts
**Layouts** are the top level vue files that describes the design of each project. 
**Components** are the child elements that are imported into the main layout.

This distinction allows for great flexibility in design for the main layout while allowing child components to be resuised across different projects

The Layout used for any project is imported in the projects content file and passed as a prop into the app.vue file. This helps with easier project set up and switching when working on multiple proejcts at once. 



## Build commands
``` bash

# Running the dev environment
# Features Hot Module Reloading
npm start

# Build out to UAT test build
npm run uat

# Build out to final RPOD package
npm run prod

```




---

__Default notes from vue-cli__
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
