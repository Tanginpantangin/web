Array.prototype.swap = function(a, b){
  var temp = this[a];
  this[a] = this[b];
  this[b] = temp;
};
