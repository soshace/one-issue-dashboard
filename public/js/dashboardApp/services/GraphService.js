angular.module('DashboardApp').service('GraphService', function() {
    this.drawPieChart = function(selector, data) {
        var formattedData = [];
        for (var value in data) {
            formattedData.push([value, data[value]]);
        }

        var chart = c3.generate({
            bindto: selector,
            data: {
                columns: formattedData,
                type: 'pie'
            },
            title: {
                text: 'Issue by Status'
            },
            pie: {
                label: {
                    format: function(x) {
                        return x;
                    }
                }
            }
        });
    };

    this.drawBarChart = function(selector, data) {
        var formattedData = [];
        for (var value in data) {
            formattedData.push([value, data[value]]);
        }

        var chart = c3.generate({
            bindto: selector,
            data: {
                columns: formattedData,
                type: 'bar'
            },
            title: {
                text: 'Issue by Status'
            },
            bar: {
                label: {
                    format: function(x) {
                        return x;
                    }
                }
            }
        });
    };
});
