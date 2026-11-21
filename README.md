# Install website
```
npm install -g bower gulp
npm install
gulp styles
```

# Development
```
PORT=8080 ENV=development node server.js
```

# Release
```
port=8080 ENV=production node server.js
```

Check google chrome **http://localhost:8080**

# Build project using gulp #
```
gulp styles: build less css and minify
```

# Converter unit tests

Run `npm test` with Node.js 22. The suite loads the browser converter services
and reuses expectations from `testing/specs.js` without installing packages
or starting a browser. It checks Unicode alias conversions and both separate
and combined legacy marks. Keep EFEO-to-Unicode fixtures pinned when changing
the font-to-font paths.

# End to end testing
1. How to setup Protractor  for end to end testing:
**https://angular.github.io/protractor/#/tutorial**
2. Run these command for testing
```
webdriver-manager start
protractor testing/config.js
```
# Deploy server
```
forever start server.js
forever stop server.js
```


