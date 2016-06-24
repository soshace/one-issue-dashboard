angular.module('DashboardApp').service('ApiService', ['$http', function(http) {

    /**
     * Gets possible filter values.
     * @param {array} Array of filter names.
     * @param {function} callback Callback function for returning of result.
     */
    this.GetFiltersContent = function(filters, callback) {
        http.post('api/issues/filter/values', filters).then(function(result) {
            callback(result.data);
        })
    };

    /**
    * Gets aggregation of issue search result with filters.
    * @param {object} filters Filters for issue selection.
    * @param {object} date Date for issue selection
    * @param {function} callback Callback function for returning of result.
    */
    this.GetIssuesAggregation = function(filters, date, callback) {
        var filterObj = {
        	filter: filters,
        	date: date
        };

        http.post('api/issues/filter/aggregate', filterObj).then(function(result) {
            callback(result.data);
        })
    }
}]);
