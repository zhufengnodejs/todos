angular.module('todoApp').controller('todoController', function ($scope, todoService, $routeParams,$filter) {
    $scope.todos = [];
    $scope.status = {};
    todoService.query().then(function (todos) {
        $scope.todos = todos;
    });

    $scope.$watch('todos',function(){
        if($scope.todos && $scope.todos.length>0){
            $scope.remainingCount = $filter('filter')($scope.todos,{completed:false}).length;
            $scope.completedCount = $filter('filter')($scope.todos,{completed:true}).length;
        }
    },true);

    $scope.createTodo = function () {
        todoService.save({title: $scope.newTodo, completed: false}).then(function (todo) {
            $scope.todos.push(todo);
            $scope.newTodo = '';
        });
    }

    $scope.delete = function (todo) {
        todoService.delete(todo).then(function () {
            $scope.todos = $scope.todos.filter(function (item) {
                return item.id != todo.id;
            });
        });
    }

    $scope.clear = function(){
        todoService.delete().then(function () {
            $scope.todos = $scope.todos.filter(function (item) {
                return !item.completed;
            });
        });
    }

    $scope.toggle = function (todo,completed) {
        if(angular.isDefined(completed)){
            todo.completed = completed;
        }
        todoService.update(todo);
    }

    $scope.$on('$routeChangeSuccess',function(){
        var status = $scope.status = $routeParams.status || '';
        $scope.statusFilter = $routeParams.status == 'active' ? {completed: false} :
            $routeParams.status == 'completed' ? {completed: true} : {};
    });

    $scope.checkAll = function(completed){
        $scope.todos.forEach(function(todo){
            if(todo.completed != completed){
                $scope.toggle(todo,completed);
            }
        });
    }

});