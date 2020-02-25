const Flight = require('../models/flight');
let yearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
let defaultDate = yearFromNow.toISOString().substr(0,19);

module.exports = {
    new: newFlight,
    create,
    index,
    show
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render('flights/show', {
            title: 'Flight Detail',
            flight,
            defaultDate
        })
    });
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        flights.sort(function(a, b) {
            return a.departs - b.departs
        })
        res.render('flights/index', {
            title: 'All Flights',
            flights
        });
    });
}

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('flights/new');
        console.log(flight);
        res.redirect('/flights');
    });
}

function newFlight(req, res) {
    res.render('flights/new', {
        title: 'Add Flight',
        defaultDate
    });
}