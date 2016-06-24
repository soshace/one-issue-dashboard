angular.module('DashboardApp').controller('mainCtrl', ['$scope', 'ApiService', 'ConstantService', 'GraphService', 'JqueryService', function($scope, api, constants, graphic, jquery) {

    /**
     * Initializes page data and contents.
     */
    function initPage() {
        var filterProps = constants.defaultFilterCategories.map(category => category.prop);

        $scope.filterMapping = angular.copy(constants.defaultFilterCategories);
        $scope.filterHasResults = true;
        setDefaultDates();
        jquery.defineScrollHandler(400, 300);

        api.GetFiltersContent(filterProps, function(filterValues) {
            $scope.filters = filterValues;
            $scope.selectedFilters = angular.copy(filterValues);

            api.GetIssuesAggregation(filterValues, $scope.issueDate, function(issues) {
                updateGraphics(issues);
            })
        });
    };

    /**
     * Sets default dates for representation.
     */
    function setDefaultDates() {
        var currentYear = moment().year();

        $scope.issueDate = {
            startDate: moment([currentYear, 0, 1]),
            endDate: moment([currentYear, 11, 31])
        };
    }

    /**
     * Initializes update of charts.
     * @param {array} issues Collection of issues for representation in charts.
     */
    function updateGraphics(issues) {
        graphic.drawPieChart('#pieChart', issues['FormUsed'], 'Issues By Status');
        graphic.drawBarChart('#barChartLocation', issues['Loc1Name'], 'Issues by Location');
        graphic.drawBarChart('#barChartIssueType', issues['IssueTypeName'], 'Issues by Types');
    }

    /**
     * Handles changing of filters data.
     * @param {object} filters Object representation of filters.
     * @param {object} date Date object, that contains start and end date of filter period of time.
     */
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
        })
    };

    /**
    * Scrolls to page top using JQuery.
    */
    $scope.scrollTop = function() {
        jquery.animateScrollOnTop(300);
    };

    initPage();
}]);
