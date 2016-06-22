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
