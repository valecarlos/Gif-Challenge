var app = angular.module('myScript', []);

app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.controller('news', function($scope, $http, $timeout){
	//load the information from the jsonfile - in a promise so we can use its result later in the directive
	$scope.promise = $http.get('http://carlosvalencia.co/news_mock.json').success(function(data) {
    	$scope.articles = data;
	});
	//initialize variables that will be used later in the scope
	$scope.currentTitle = "";
    $scope.showDetails = false;
});

app.directive('accordion', function($timeout, $q){
	return{
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			//bind the showDetails into the scope so it can be seen by all of the accordion elements
	    	promise: '&?',
	    	currentTitle: '=',
	    	showDetails: '=?bind',
	    	artic: '='
	    },
	    //add the current-title to the html tag so it can be seen by the directive and make the 
	    //two way binding.
		template: '<dl ng-transclude promise="promise" current-title="currentTitle"></dl>',
		link: function(scope,element){
			//promise used for async calls, in this case the json load
			var promise = scope.promise ? scope.promise() : $q.resolve();
			promise.then($timeout).then(function() {
				
				element.find('dt').on('click', function(event){
					/*first find all the dd elements and hide them, they have to be angular elements 
					otherwise the hasClass function and the others won't work*/
					/*this function manages the toggle of classes to show/hide content*/
					var self = this;
					var nextElement = angular.element(self).next();
					var wasShowing = nextElement.hasClass("is-showing");
					var titleElement = angular.element(document.querySelector('#titleContainer'));
					console.log(titleElement);

					for (var i=0; i< element.find('dd').length;i++){
						if (angular.element(element.find('dd')[i]).hasClass("is-showing")) {
							angular.element(element.find('dd')[i]).removeClass("is-showing");
							angular.element(element.find('dd')[i]).addClass("is-hidden");
						}
					}
					//angular.element(document.querySelector('#titleContainer')).removeClass("show-titles");
					if( titleElement.hasClass("fade-in")){
						//add class before we remove the next one, so the animations don't jump
						titleElement.addClass("fade-out");
						titleElement.removeClass("fade-in");
					}
					

					if (!wasShowing){
						nextElement.removeClass("is-hidden");
						nextElement.addClass("is-showing");
						//angular.element(document.querySelector('#titleContainer')).addClass("show-titles");
						//angular.element(document.querySelector('#titleContainer')).addClass("fade-out");
						titleElement.addClass("fade-in");
						titleElement.removeClass("fade-out");
					}
					//get the article title property from the element clicked and assign it to the scope variable
					scope.currentTitle = angular.element(self)[0].innerText;
					scope.$apply() ;	
				});
			});
		}
	};
});

