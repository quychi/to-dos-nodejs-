var app = angular.module("app.todos", ["xeditable"]);

app.controller("todoController", ['$scope', 'svTodos', function ($scope, svTodos) {
    
    $scope.appName = "Todo Dashboard";
    $scope.formData = {};
    $scope.loading = true;

    $scope.todos = [];

    //load data from api
    svTodos.get().then(function (response) {
        $scope.todos = response.data;
        $scope.loading = false;
    },function (error){
        console.log(error, 'can not get data.');
    });
        

    $scope.createTodo = function () {
        $scope.loading = true;
        var todo = {
            text: $scope.formData.text,
            isDone: false
        }

        svTodos.create(todo)
            .then(function (response) {
                $scope.todos = response.data;
                $scope.formData.text = "";
                $scope.loading = false;
            },function (error){
                console.log(error, 'can not create data.');
            });

    }

    $scope.updateTodo = function (todo) {
        console.log("Update todo: ", todo);
        $scope.loading = true;

        svTodos.update(todo)
            .then(function (response) {
                $scope.todos = response.data;
                $scope.loading = false;
            },function (error){
                console.log(error, 'can not update data.');
            });
    }

    $scope.deleteTodo = function (todo) {
        console.log("Delete todo: ", todo);
        $scope.loading = true;

        svTodos.delete(todo._id)
            .then(function (response) {
                $scope.todos = response.data;
                $scope.loading = false;
            },function (error){
                console.log(error, 'can not delete data.');
            });
    }
    
}]);