(function() {
  angular.module('questions')
         .service('QuestionListWatchService',
         [QuestionListWatchService]);

  function QuestionListWatchService() {

        function listWatcher(url) {
          this.url = url;
          this.callBacks = [];
          this.closeCallBacks = [];

          this._connect();
        };

        listWatcher.prototype.onMessage = function onMessage(cb) {
          this.callBacks.push(cb);
          return this;
        };

        listWatcher.prototype._connect = function _connect() {
          // should go throug a backend for mocks
          this.ws = new WebSocket(this.url);
          this.ws.onmessage = angular.bind(this, this._onmessage);
        };


        listWatcher.prototype._onmessage = function _onmessage(raw) {
            var message = JSON.parse(raw.data);
            for(var i = 0; i < this.callBacks.length; i++)
            {
              var cb = this.callBacks[i];
              cb.call(this, message);
            }
          };


          return function(url) {
            return new listWatcher(url);
          }

        };


})();
