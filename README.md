npm install -g bower gulp

# Salonhelps Web App #

1. cd path/of/project
2. sudo npm install -g nodemon
3. npm install

# Development
1. gulp config --development
2. sudo ENV=development nodemon server.js

# Release
1. gulp release --production
2. sudo forever start server.js

Check google chrome **http://localhost**

# Build project using gulp #

1. gulp scripts: build javascripts files
2. gulp html: minify html
3. gulp styles: build less css and minify
4. gulp config --production || --development: build config
5. gulp images: optimize images
6. gulp copyfiles: copy bower_components and fonts
7. gulp clean: remove code files
8. gulp clean-all: remove everything in dist
