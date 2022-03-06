var Ticket = /** @class */ (function () {
    function Ticket(destination, price, status) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
    return Ticket;
}());
var ticketsStore;
function sort(criteria) {
    return ticketsStore.sort(function (a, b) {
        if (criteria == 'destination') {
            return a.destination.localeCompare(b.destination);
        }
        else if (criteria === 'price') {
            return a.price - b.price;
        }
        else {
            return a.status.localeCompare(b.status);
        }
    });
}
function solve(tickets, criteria) {
    console.log('Sorting by ', criteria);
    ticketsStore = [];
    tickets.forEach(function (t) {
        var ticketProperties = t.split('|');
        ticketsStore.push(new Ticket(ticketProperties[0], Number(ticketProperties[1]), ticketProperties[2]));
    });
    sort(criteria);
    console.log(ticketsStore);
}
solve([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
], 'destination');
solve([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
], 'status');
