var nano = require('nano')('https://ivan:dashboard@one-issue.cloudant.com/oi_clean');
var selectAttributes = ['Loc1Name', 'IssueTypeName', 'FormUsed'];
var dateFilterProperty = 'opened_date';

/**
 * Selects only attributes that are set in select array from the document.
 * @param {object} record Document for selection.
 * @return {object} Selected properties of an object.
 */
function SelectAttributes(record) {
    var result = {};
    selectAttributes.map(attribute => result[attribute] = record[attribute]);
    return result;
}

/**
 * Applies filter object to record.
 * @param {object} record Document for filter applying.
 * @param {object} filter Object that contains appropriate values for filtering.
 * @result {boolean} True - object matches the filter, otherwise - false.
 */
function ApplyFilter(record, filter) {
    for (var property in filter) {
        var filterValues = filter[property];
        var recordPropertyValue = record[property];

        if (filterValues.indexOf(recordPropertyValue) === -1) {
            return false;
        }
    }

    return true;
}

function FilterByDate(startOn, endOn, targetDate) {
	
    // Added to prevent invalid date error.
	var datePart = targetDate.split(' ')[0].split('/');
	var date = new Date(Number(datePart[2]), Number(datePart[1]) - 1, Number(datePart[0]));

    var start = new Date(startOn);
    var end = new Date(endOn);

    return date >= start && date <= end;
}

module.exports = function(api) {

    // Returns possible values for filtering.
    api.route('/issues/filter/values').post(function(req, res) {
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

    // Returns filtered sequence of documents.
    api.route('/issues/filter').post(function(req, res) {
        var filterValues = req.body.filter;
        var date = req.body.date;

        var result = [];
        nano.view('oi', 'issues', function(err, body) {
            body.rows.map(doc => {
                if (ApplyFilter(doc.value, filterValues) && FilterByDate(date.startDate, date.endDate, doc.value[dateFilterProperty])) {
                    result.push(SelectAttributes(doc.value));
                }
            });

            res.json(result);
        });
    });

    // Returns aggregated by select parameters result sequence.
    api.route('/issues/filter/aggregate').post(function(req, res) {
        var filterValues = req.body.filter;
        var date = req.body.date;

        var selectedValues = [];
        var result = {};
        nano.view('oi', 'issues', function(err, body) {
            body.rows.map(doc => {
                if (ApplyFilter(doc.value, filterValues) && FilterByDate(date.startDate, date.endDate, doc.value[dateFilterProperty])) {
                    selectedValues.push(SelectAttributes(doc.value));
                }
            });

            selectedValues.map(doc => {
                for (property in doc) {
                    if (typeof result[property] === 'undefined') {
                        result[property] = {};
                    }

                    var documentPropertyValue = doc[property];
                    if (typeof result[property][documentPropertyValue] === 'undefined') {
                        result[property][documentPropertyValue] = 0;
                    }

                    result[property][documentPropertyValue]++;
                }
            });

            res.json(result);
        });
    });

};
