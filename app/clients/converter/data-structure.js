'use strict';

window.Stack = function() {
    this.stac = [];
    this.pop = function() {
        return this.stac.pop();
    };
    this.push = function(item) {
        this.stac.push(item);
    };
    this.length = function() {
        return this.stac.length;
    };
};
