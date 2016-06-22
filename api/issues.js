var nano = require('nano')('https://ivan:dashboard@one-issue.cloudant.com/oi_clean');

module.exports = function(api) {
    api.route('/issues/filters').post(function(req, res) {
        var filters = req.body;

        var result = {};
        nano.view('oi', 'issues', function(err, body) {
            body.rows.map(doc => {
                filters.map(filter => {
                    if (typeof doc.value[filter] !== 'undefined') {
                        if (typeof result[filter] === 'undefined') {
                            result[filter] = [];
                        }
                        var filterPropValue = doc.value[filter];

                        if (result[filter].indexOf(filterPropValue) === -1) {
                            result[filter].push(filterPropValue);
                        }
                    }
                });
            });
            res.json(result);
        });
    });
};
