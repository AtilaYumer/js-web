class Ticket {
    public destination: string;
    public price: number;
    public status: string;

    constructor(destination: string, price: number, status: string) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
}

let ticketsStore: Array<Ticket>;

function sort(criteria: string): Array<Ticket> {
    return ticketsStore.sort((a, b) => {
        if (criteria == 'destination') {
            return a.destination.localeCompare(b.destination);
        } else if (criteria === 'price') {
            return a.price - b.price;
        } else {
            return a.status.localeCompare(b.status);
        }
    });
}

function solve(tickets: Array<string>, criteria: string) {
    console.log('Sorting by ', criteria);
    
    ticketsStore = [];
    tickets.forEach(t => {
        const ticketProperties = t.split('|');
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
],
    'destination');

solve([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
],
    'status')