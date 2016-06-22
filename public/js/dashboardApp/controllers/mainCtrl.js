angular.module('DashboardApp').controller('mainCtrl', ['$scope', 'ApiService', 'ConstantService', function($scope, api, constants) {
    function initPage() {
        var filterProps = constants.defaultFilterCategories.map(category => category.prop);

        $scope.filterMapping = angular.copy(constants.defaultFilterCategories);
        setDefaultDates();

        api.GetFiltersContent(filterProps, function(filterValues) {
            $scope.filters = filterValues;
            $scope.selectedFilters = angular.copy(filterValues);
        });
    };

    function setDefaultDates() {
        var currentYear = moment().year();

        $scope.issueDate = {
            startDate: moment([currentYear, 0, 1]),
            endDate: moment([currentYear, 11, 31])
        };
    }

    $scope.handleFilterChange = function(filters, date) {
        api.GetIssuesAggregation(filters, date, function(issues) {
            console.log(issues);
        })
    }

    initPage();
}]);
