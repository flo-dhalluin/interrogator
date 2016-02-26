(function() {

    angular.module('questions')
	.controller('QuestionDetailCtrl', ['$scope',
					   '$routeParams',
					   'QuestionService',
					   QuestionDetailCtrl]);

    function QuestionDetailCtrl($scope, $routeParams, QuestionService) {

	     $scope.question = QuestionService.detail({slug:$routeParams.questionId});

       $scope.postAnswer = function(answerText) {
           var a = QuestionService.postAnswer({slug: $scope.question.slug},
                                               {text: answerText});
           $scope.question.answers.unshift(a);
       }
    };

})();
