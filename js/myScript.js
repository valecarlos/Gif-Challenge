var app = angular.module('myScript', []);

app.controller('news', function($scope, $http, $timeout){
	$scope.promise = $http.get('http://www.carlosvalencia.co/news_mock.json').success(function(data) {
    	$scope.articles = data;
	});
	$scope.currentTitle = "my - title";
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
	    	currentTitle: '=?',
	    	showDetails: '=?bind'
	    },
		template: '<dl ng-transclude></dl>',
		link: function(scope,element){
			//promise used for async calls, in this case the json load
			var promise = scope.promise ? scope.promise() : $q.resolve();
			promise.then($timeout).then(function() {
				
				element.find('dt').on('click', function(event){
					/*first find all the dd elements and hide them, they have to be angular elements 
					otherwise the hasClass function and the others won't work*/
					var self = this;
					console.log(angular.element(self).children);
					var nextElement = angular.element(self).next();
					var wasShowing = nextElement.hasClass("is-showing");

					for (var i=0; i< element.find('dd').length;i++){
						if (angular.element(element.find('dd')[i]).hasClass("is-showing")) {
							angular.element(element.find('dd')[i]).removeClass("is-showing");
							angular.element(element.find('dd')[i]).addClass("is-hidden");
						}
					}

					if (!wasShowing){
						nextElement.removeClass("is-hidden");
						nextElement.addClass("is-showing");
					}	
					//console.log(scope);
					scope.currentTitle = "i've changed";
					scope.$apply() ;

	/*
					//toggle classes as defined on the CSS
					var myToggleClasses = function(elToToggle){
					if (elToToggle.hasClass("is-showing")){
							elToToggle.removeClass("is-showing");
							elToToggle.addClass("is-hidden")
						} 
						else if (elToToggle.hasClass("is-hidden")) {
							elToToggle.removeClass("is-hidden");
							elToToggle.addClass("is-showing");
						}
						else{
							elToToggle.addClass("is-showing");
						}

					}

					for (var i=0; i< element.find('dd').length;i++){
						if (angular.element(self).next() == angular.element(element.find('dd')[i]))
							{console.log("eureka");}
						console.log(angular.element(self).next());
						console.log(angular.element(element.find('dd')[i]));
						if (angular.element(element.find('dd')[i]).hasClass("is-showing")) {
						angular.element(element.find('dd')[i]).removeClass("is-showing");
						angular.element(element.find('dd')[i]).addClass("is-hidden");
					};
					}
					
					
					//console.log("this is: " + this[0].tagName);
					//if the element clicked is the DT tag hence ->this<- the next element is the DD so we want to close it
					if (event.target == self){
						//element.find("dd").css('display', 'none');
						var ddToOpen = angular.element(event.target).next();

						//ddToOpen.removeClass("is-hidden");
						//ddToOpen.addClass("is-showing");
						myToggleClasses(ddToOpen);

					}

					else{
						var parent = angular.element(event.target)[0].parentElement;
						//if any of the children is clicked go find the DT element
						if (parent == self){
							//element.find("dd").css('display', 'none');
							var ddToOpen = angular.element(parent).next();
							//ddToOpen.removeClass("is-hidden");
							//ddToOpen.addClass("is-showing");
							myToggleClasses(ddToOpen);
						}
						else {
							//if any of the Grand-children is clicked go find the DT element
							var grandParent = angular.element(parent)[0].parentElement;
							if (grandParent == self){
								//element.find("dd").css('display', 'none');
								var ddToOpen = angular.element(grandParent).next();
								//ddToOpen.removeClass("is-hidden");
								//ddToOpen.addClass("is-showing");
								myToggleClasses(ddToOpen);
							}

						}
					}*/
					
				});
			});
		}
	};
});

/*this would be using jquery- but it doesn't work when angular is in use
var myAccordion = $('.accordion');
myAccordion.find('dd').hide();
myAccordion.find('dt').on('click', function(){
	console.log("i should slide down");
	$this.next('dd').slideDown();
});
*/