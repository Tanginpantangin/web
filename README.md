# Install website
1. npm install -g bower gulp
2. npm install
3. gulp styles

# Development
1. port=8080 ENV=development node server.js

# Release
1. port=8080 ENV=production node server.js

Check google chrome **http://localhost:8080**

# Build project using gulp #
1. gulp styles: build less css and minify

# End to end testing
1. How to setup Protractor  for end to end testing:
**https://angular.github.io/protractor/#/tutorial**
2. Run these command for testing
webdriver-manager start
protractor testing/config.js
