
var app = angular.module('questionApp', ['ngMaterial',
					 'ngRoute',
					 'questions']);

app.config(['$routeProvider',

	    function($routeProvider) {
		$routeProvider.
		    when("/questions", {
			templateUrl: 'partials/phone-list.html',
			controller: 'QuestionCtrl',
		    }).
		    when('/questions/:questionId', {
			templateUrl: 'partials/question-detail.html',
			controller: 'QuestionDetailCtrl'
		    }).
		    otherwise({
			redirectTo: '/questions'
		    });

	    }]);


app.config(['$httpProvider', function($httpProvider) {
	    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);
