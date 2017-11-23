const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {

    const query = Artist.find(buildQuery(criteria))
        .sort({[sortProperty]: 1}) // if the sortPorperty is name then it iwll be name: 1
        .skip(offset)
        .limit(limit);

    return Promise.all([
        query,
        Artist.find(buildQuery(criteria)).count() //for count:count in the question from the query results returned
    ]).then((results) => {
        return {
            all: results[0],
            count: results[1], // all[1] order
            offset: offset,
            limit: limit
        }
    });
};

const buildQuery = (criteria) => {
    const query = {};
    if (criteria.age) {
        query.age = {
            $gte: criteria.age.min,
            $lte: criteria.age.max
        }
    }
    //in mongo terminal
    //db.artists.createIndex({name:'text'}) <<- only set text because of $text for text search
    //https://docs.mongodb.com/manual/core/index-text/ for multiple attrs on $text

    if (criteria.name) {
      query.$text = {$search:criteria.name};
    }
    if (criteria.yearsActive) {
        query.yearsActive = {
            $gte: criteria.yearsActive.min,
            $lte: criteria.yearsActive.max
        };
    }

    return query;
};
