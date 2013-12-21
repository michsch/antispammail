/**
usage: log('inside coolFunc', this, arguments);
paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
*/

window.log = function() {
  log.history = log.history || [];
  log.history.push(arguments);
  if (this.console) {
    arguments.callee = arguments.callee.caller;
    return console.log(Array.prototype.slice.call(arguments));
  }
};

/*
make it safe to use console.log always
*/


(function(b) {
  var a, c, d, _results;
  c = function() {};
  d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(",");
  _results = [];
  while (a = d.pop()) {
    _results.push(b[a] = b[a] || c);
  }
  return _results;
})(window.console = window.console || {});

/*
//@ sourceMappingURL=log.js.map
*/