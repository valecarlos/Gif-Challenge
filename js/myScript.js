var app = angular.module('myScript', []);

app.controller('news', function($scope, $http, $timeout){
	$scope.promise = $http.get('http://www.carlosvalencia.co/news_mock.json').success(function(data) {
    $scope.articles = data;
    $scope.currentTitle = "my title";
});
});

app.directive('accordion', function($timeout, $q){
	return{
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
	    	promise: '&?'
	    },
		template: '<dl ng-transclude></dl>',
		link: function(scope,element){
			//promise used for async calls, in this case the json load
			var promise = scope.promise ? scope.promise() : $q.resolve();
			promise.then($timeout).then(function() {
				//toggle classes as defined on the CSS
				var myToggleClasses = function(elToToggle){
					console.log("ive been called")
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
				element.find('dt').on('click', function(event){
					var self = this;
					//console.log("this is: " + this[0].tagName);
					//if the element clicked is the DT tag hence ->this<- the next element is the DD so we want to close it
					if (event.target == self){
						//element.find("dd").css('display', 'none');
						var ddToOpen = angular.element(event.target).next();
						//ddToOpen.css('display','block');
						myToggleClasses(ddToOpen);
					}

					else{
						var parent = angular.element(event.target)[0].parentElement;
						//if any of the children is clicked go find the DT element
						if (parent == self){
							//element.find("dd").css('display', 'none');
							var ddToOpen = angular.element(parent).next();
							//ddToOpen.css('display','block');
							myToggleClasses(ddToOpen);
						}
						else {
							//if any of the Grand-children is clicked go find the DT element
							var grandParent = angular.element(parent)[0].parentElement;
							if (grandParent == self){
								//element.find("dd").css('display', 'none');
								var ddToOpen = angular.element(grandParent).next();
								//ddToOpen.css('display','block');
								myToggleClasses(ddToOpen);
							}

						}
					}
					
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