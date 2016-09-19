angular.module('todoApp', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider) {
        var routeConfig = {
            templateUrl:'todoPage.html',
            controller:'todoController'
        }
        $routeProvider.when('/', routeConfig).when('/:status', routeConfig).otherwise({redirectTo: '/'})
    })