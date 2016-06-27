directives.directive("imgProfile", function() {
    return {
        restrict : 'E',
        templateUrl : 'templates/directives/imgProfile.html',
        scope: {
          width: "@width"
        }
    };
})
