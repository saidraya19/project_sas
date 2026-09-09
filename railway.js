const trips = require("./data.js");
console.log(trips[0])
const  input = require('readline-sync')
function validnumber(prompte)
{
        while(true)
        {
                let value = input.question(prompte)
                let num = Number(value)
                if(!isNaN(num) && value.trim() !== "" && Number.isInteger(num) && num > 0)
                {
                        return num;
                }
                console.clear();
                console.log("type of value invalide, enter number please: ")
        }
}
function validstring(prompte)
{
        while(true)
        {
                let value = input.question(prompte)
                if(isNaN(value) && value.trim() != "" )
                {
                        return value;
                }
                console.clear();
                console.log("type of value invalide, Please enter a valid text (letters only).")
	}
}
function Print_tecket(trip,index)
{
        let route = `${trip.departure} -> ${trip.destination}`;
        let idx = String(index + 1).padEnd(5, ' ')
        let id = String(trip.id).padEnd(2, ' ')
        let route_to = route.padEnd(24, ' ');
        let departureTime = String(trip.departureTime).padEnd(9, ' ')
        let arrivalTime = String(trip.arrivalTime).padEnd(7, ' ')
        let price = String(trip.price).padEnd(6, ' ')
        let availableSeats = String(trip.availableSeats).padEnd(5, ' ')
        console.log(`|${idx} | ${id} | ${route_to} | ${departureTime} | ${arrivalTime} | ${price}DH | ${availableSeats} |`);
}
function displayTrips(routes)
{
	if(routes.length == 0)
	{
		console.log("No trips available")
		return;
	}
	console.log("---------------------------------------------------------------------------------")
        console.log(" Index | ID |Rout                      | Departure | Arrival | Price    | Seats |")
	 console.log("-------------------------------------------------------------------------------")
	for(let i = 0; i < routes.length; i++)
	{
		Print_tecket(routes[i],i)
	}
}
displayTrips(trips)
let tickets = [];
function BuyTicket(trips, tickets)
{
	console.clear();
	let name = validstring("Passenger name: ")
	let id = validnumber("Trip id: ")
	let found = null
	for(const one_trip of trips)
	{
		if(id == one_trip.id)
		{
			found = one_trip;
			break
		}
	}
	if(!found)
	{
		console.log("Trip not found")
	}
	else
	{
		if(found.availableSeats === 0)
		{
			console.log("Train is full.")
		}
		else
		{
			let tripid = found.id;
			let id = tickets.length + 1
			let seat = 50 - found.availableSeats + 1;
			let price = found.price;
			found.availableSeats--
			const cart = { id, passengerName:name, tripid, seat, price}
			tickets.push(cart);
			console.log("Ticket purchased successfully.");
			console.log(cart);
		}
	}
}
BuyTicket(trips, tickets)

