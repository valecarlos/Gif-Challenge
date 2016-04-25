var app = angular.module('myScript', []);

app.controller('news', function($scope, $http){
	$http.get('http://www.carlosvalencia.co/news_mock.json').success(function(data) {
    $scope.articles = data;
});


});