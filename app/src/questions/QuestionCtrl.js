(function() {

    angular.module('questions')
        .controller('QuestionCtrl', ['$scope',
				     '$location',
             '$mdDialog',
				     'QuestionService',
				     QuestionCtrl]);

    function QuestionCtrl($scope, $location, $mdDialog, QuestionService) {

	$scope.questions = QuestionService.list();

	$scope.goToQuestion = function(questionId) {
	    $location.path("/questions/" + questionId);
	};

	$scope.$watch("newQuestionText", function() {
	    console.log($scope.newQuestionText);
	});

  $scope.openNewQuestion = function() {

      $mdDialog.show({
        templateUrl: "/src/questions/views/new-question.html",
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        controller: NewQuestionDialogController
      }).then(function(newQuestionText) {
        var newQ = QuestionService.create([], {text: newQuestionText});
        $scope.questions.unshift(newQ);
      });

  };

  function NewQuestionDialogController($scope, $mdDialog) {
    //$scope.newQuestionText = newQuestionText;
    $scope.createQuestion = function() {
      $mdDialog.hide($scope.newQuestionText);
    };

    $scope.closeDialog = function() {
      $mdDialog.cancel();
    }
  };


};

})();
