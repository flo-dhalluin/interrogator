(function() {
    angular.module('questions')
	   .service('QuestionService', ['$resource', QuestionService]);

    function QuestionService($resource) {

      return $resource('api/questions',
                       {},
                       {list: {method: 'GET',
                               isArray: true},
                        create: {method: 'POST'},
                        detail: {method: 'GET',
                                 url: 'api/question/:slug'},
                        postAnswer: {method: 'POST',
                                     url: 'api/question/:slug/answer'}});
    };

})();
