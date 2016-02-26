(function() {
    angular.module('questions')
	.directive('questionList', QuestionListDirective)

    function QuestionListDirective() {
	return {
	    templateUrl: '/src/questions/views/question-list.html' 
	}
    }
})();
