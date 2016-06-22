angular.module('DashboardApp').service('GraphService', function() {
    var cachedCharts = {};

    this.drawPieChart = function(selector, data) {
        var formattedData = [];
        for (var value in data) {
            formattedData.push([value, data[value]]);
        }

        if (typeof cachedCharts[selector] === 'undefined') {
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
            cachedCharts[selector] = chart;
        } else {
            if (formattedData.length) {
                cachedCharts[selector].load({ columns: formattedData });
            } else {
                cachedCharts[selector].destroy();
                delete cachedCharts[selector];
            }
        }
    }
});
