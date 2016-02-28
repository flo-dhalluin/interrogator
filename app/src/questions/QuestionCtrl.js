(function() {

    angular.module('questions')
        .controller('QuestionCtrl', ['$scope',
				     '$location',
             '$mdDialog',
             '$mdToast',
				     'QuestionService',
             'QuestionListWatchService',
				     QuestionCtrl]);

    function QuestionCtrl($scope,
                          $location,
                          $mdDialog,
                          $mdToast,
                          QuestionService,
                          QuestionListWatchService) {

	$scope.questions = QuestionService.list();

  var watcher = QuestionListWatchService("ws://localhost:8000/");

  watcher.onMessage(function(data) {
    console.log(data);
    if(data.type == "new") {
        // don't insert if we already have this one
        if(! $scope.questions.find(function(q) {return q.slug === data.slug}))
        {
          $scope.questions.unshift(QuestionService.detail({slug: data.slug}));
        }

    }
    // debug toast
    $mdToast.show(
      $mdToast.simple()
              .textContent(data)
              .position("top right")
              .hideDelay(10000)
      );
  });


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
