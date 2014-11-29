
# snowflake

> "A snowflake is either a single ice crystal or an aggregation of ice crystals which falls through the Earth's atmosphere."

##### snowflake is a simple way to create a landing page built on top of [eskimo.io](https://github.com/niftylettuce/eskimo).

![snowflake](snowflake.png?raw=true)

## Features
- Collect email addresses.
- Admin (list subscribers).
- Google Analytics (track page views).

## TODO
- Unsubscribe
- MailChimp campaing/s
- A/B Testing
- Support for social networks
- Improve Stats

## Install

```bash
# clone the repo
git clone git@github.com:oitozero/snowflake.git

# change dir to the cloned repo
cd snowflake

# install dev dependencies
npm install -d

# install gulp cli
npm install -g gulp

# build bower/less files
gulp postinstall
```


## Configuration

Configuration (e.g. database and logging setting per environment) is stored in "boot/config.js". 


## Usage

### Development

Default:

```bash
node app
```

Debugging:

```bash
DEBUG=* node app
```

###### Open http://localhost:3000
###### Open http://localhost:3000/admin (default auth: username/password)
Note: set basicAuth.username and basicAuth.password in config.js

#### Gulp tasks:

```bash
# Run 'bower', 'less', and 'jshint' tasks
gulp postinstall

# Runs 'build'
gulp

# Run jshint to check syntax of JavaScript files
gulp jshint

# Runs 'clean', 'bower', 'less', 'copy', 'imagemin', 'usemin-css', 'usemin-js', and 'usemin-jade'
gulp build

# Runs 'watch-noreload', and starts a livereload server to automatically refresh your browser when changes are done
gulp watch

# Watches changes to public assets (images, fonts, less/css, js, and jade files) and runs appropriate tasks ('imagemin', 'less'/'usemin-css', 'usemin-js', 'usemin-jade') to parse them
gulp watch-noreload

# Run less to create CSS files
gulp less

# Optimizes and copies images to 'assets/dist/img'
gulp imagemin

# Adds versions to JS files, copying them later to 'assets/dist/js'
gulp usemin-js

# Adds versions to CSS files, optimizes and parses images and CSS files as well, copying them later to 'assets/dist'
gulp usemin-css

# Adds versions to assets in JADE files, optimizes and parses assets, copying them later to 'assets/dist'
gulp usemin-jade

# Cleans 'assets/dist' and 'bower_components' directories
gulp clean

# Copies some static files (favicon, robots.txt, etc) to 'assets/dist'
gulp copy
```

### Production

> Production environment requires that you have built out the "assets/dist" folder.

Build project with [gulp.js](http://gulpjs.com/):

```bash
gulp build
```

> Now you can proceed to running in production mode with optional `recluster` support.

Default:

```bash
sudo NODE_ENV=production node app
```

[Recluster](https://github.com/doxout/recluster):

```bash
sudo NODE_ENV=production node cluster
# kill -s SIGUSR2 %d
```


## Tests

```bash
npm test
```


## Contributors
- [oitozero](http://oitozero.com)

## License

The MIT License (MIT)

Copyright (c) [2014] [oitozero]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
