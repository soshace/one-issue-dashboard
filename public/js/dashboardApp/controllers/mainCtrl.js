angular.module('DashboardApp').controller('mainCtrl', ['$scope', 'ApiService', 'ConstantService', 'GraphService', '$window', function($scope, api, constants, graphic, $window) {
    function initPage() {
        var filterProps = constants.defaultFilterCategories.map(category => category.prop);

        $scope.filterMapping = angular.copy(constants.defaultFilterCategories);
        $scope.filterHasResults = true;
        setDefaultDates();

        api.GetFiltersContent(filterProps, function(filterValues) {
            $scope.filters = filterValues;
            $scope.selectedFilters = angular.copy(filterValues);

            api.GetIssuesAggregation(filterValues, $scope.issueDate, function(issues) {
                updateGraphics(issues);
            })
        });
    };

    function setDefaultDates() {
        var currentYear = moment().year();

        $scope.issueDate = {
            startDate: moment([currentYear, 0, 1]),
            endDate: moment([currentYear, 11, 31])
        };
    }

    function updateGraphics(issues) {
        graphic.drawPieChart('#pieChart', issues['FormUsed'], 'Issues By Status');
        graphic.drawBarChart('#barChartLocation', issues['Loc1Name'], 'Issues by Location');
        graphic.drawBarChart('#barChartIssueType', issues['IssueTypeName'], 'Issues by Types');
    }

    $scope.handleFilterChange = function(filters, date) {
        api.GetIssuesAggregation(filters, date, function(issues) {
            var hasResults = Object.getOwnPropertyNames(issues).length > 0;

            $scope.filterHasResults = hasResults;
            if (hasResults) {
                // Added to prevent unexpected changing of chart's width after drawing.
                setTimeout(function() {
                    updateGraphics(issues);
                }, 500);
            }
            $window.scrollTo(0, 0);
        })
    }

    initPage();
}]);
