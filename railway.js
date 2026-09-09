const trips = require("./data.js");
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
	input.question("Press Enter to return to menu...");
        return;

}
function print_tecket(cart, find)
{
		console.log("===========================================")
		console.log(`ticket :#${cart.id}`)
		console.log(`Passager :${cart.passengerName}`)
		console.log(`Trajet :${find.departure} -> ${find.destination}`)
		console.log(`price :${cart.price}`);
		console.log("===========================================")
}

let tickets = [
    {
        id: 1,
        passengerName: "Ahmed",
        tripid: 3,
        seatNumber: 1,
        price: 140
    },
    {
        id: 2,
        passengerName: "Ahmed",
        tripid: 1,
        seatNumber: 1,
        price: 25
    },
    {
        id: 3,
        passengerName: "Ahmed",
        tripid: 2,
        seatNumber: 1,
        price: 90
    },
    {
        id: 4,
        passengerName: "Fatima",
        tripid: 6,
        seatNumber: 1,
        price: 120
    },
    {
        id: 5,
        passengerName: "Omar",
        tripid: 4,
        seatNumber: 1,
        price: 65
    },
    {
        id: 6,
        passengerName: "Imane",
        tripid: 7,
        seatNumber: 1,
        price: 150
    },
    {
        id: 7,
        passengerName: "Hamza",
        tripid: 8,
        seatNumber: 1,
        price: 40
    },
    {
        id: 8,
        passengerName: "Salma",
        tripid: 10,
        seatNumber: 1,
        price: 30
    },
    {
        id: 9,
        passengerName: "Mehdi",
        tripid: 11,
        seatNumber: 1,
        price: 95
    },
    {
        id: 10,
        passengerName: "Aya",
        tripid: 5,
        seatNumber: 1,
        price: 110
    },
    {
        id: 11,
        passengerName: "Adam",
        tripid: 3,
        seatNumber: 2,
        price: 140
    },
    {
        id: 12,
        passengerName: "Nour",
        tripid: 3,
        seatNumber: 3,
        price: 140
    }
];
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
			console.log("===========================================")
			console.log(`ticket :#${cart.id}`)
			console.log(`Passager :${cart.passengerName}`)
			console.log(`Trajet :${found.departure} -> ${found.destination}`)
			console.log(`"price :${found.price}`);
			console.log("===========================================")

		}
	}
	input.question("Press Enter to return to menu...");
        return;
}
function Show_Tickets(list_of_tickets, trips)
{
	for(const ticket of list_of_tickets)
	{
		print_tecket(ticket)
	}
}
function DeletTicket(tickets)
{
	let find_ticket = null;
	while(true)
	{
	id_de_ticket = validnumber("enter id of ticket: ")
	for(const cart of tickets)
	{
		if(cart.id == id_de_ticket)
		{
			find_ticket = cart;
			break;
		}
	}
	if(!find_ticket)
	{
		console.log("this ticket not exist.")
		return;
	}
	else
	{
		for(const route of trips)
		{
			if(find_ticket.trip == route.id)
			{
				route.availableSeats += 1;
				list_of_tickets.find_ticket;
			}
		}
	}
		console.log("ticket removed successfully.")
		answer = validstring("do you want delet more tickets? enter Y/N: ")
		if(answer == "N" || answer == "N")
		{
			break;
		}
	}
	input.question("Press Enter to return to menu...");
        return;
}
function SearchForTicket(tickets,trips)
{
	PassangerName = validstring("Passanger Name: ")
	for(const cart of tickets)
	{
		let found = null;
		if(cart.passengerName === PassangerName)
		{
			for(const route of trips)
			{
				if(route.id === cart.tripid)
				{
					found = route
				}
			}print_tecket(cart,found);
		}
	}
	console.log("this ticket not exist")
	input.question("Press Enter to return to menu...");
        return;
}
function FilterTrips(list)
{
	let trip = validstring("enter the trip: ")

	for(const route of list)
	{
		if(route.departure === trip)
		{
			console.log(`${route.departure} -> ${route.destination}: ${route.price} DH`);
		}
	}
	input.question("Press Enter to return to menu...");
        return;
}
function SearchByPrice(trips)
{
	let TempTrips = [...trips];
	for(let i = 0; i < TempTrips.length;i++)
	{
		for(let j = 0; j < TempTrips.length - 1 - i; j++)
		{
			if(TempTrips[j].price > TempTrips[j + 1].price)
			{
				[TempTrips[j], TempTrips[j + 1]] = [TempTrips[j + 1], TempTrips[j]]
			}
		}
	}
	console.log("==========Trier les trajets===========")	
	for(const route of TempTrips)
	{
		console.log(`${route.departure} -> ${route.destination}: ${route.price} DH`);
	}
	input.question("Press Enter to return to menu...");
        return;

}
function Statistiques(tickets)
{
	console.log("Nombre total de tickets :",tickets.length);
	let sum = 0;
	for(const route of tickets)
	{
		sum += route.price;
	}
	console.log("Nombre total de tickets :", sum);
	let min = trips[0];
	for(const route of trips)
	{
		if(min.availableSeats > route.availableSeats)
		{
			min = rout;
		}
	}
	console.log(min.availableSeats);
	console.log("======Trajet le plus vendu======")
	console.log(`${min.departure} -> ${min.destination}`)
	console.log(`${50 - min.availableSeats} tickets vendus`);
	input.question("Press Enter to return to menu...");
	return;

}
function Menu()
{
	         console.log("---------------------------------------------------------------");
                 console.log("---------------------------------------------------------------");
                 console.log("                        RAILWAY MANAGER                        " );
                 console.log("---------------------------------------------------------------");
                 console.log("---------------------------------------------------------------");
                 console.log("[1]   show trip list. ")
                 console.log("[2]   buy ticket." )
                 console.log("[3]   delete ticket" )
                 console.log("[4]   show ticket list.")
                 console.log("[5]   Search for ticket" )
                 console.log("[6]   Filter trips." )
                 console.log("[7]   Sort by price.")
		 console.log("[8]   statistique")
                 console.log("[0]   exit.")
}
function Generate(trips,tickets)
{
	while(true)
	{
		Menu();
	answer = validNumber("choose what do you want to do? from[1 to 8] :")
	switch(answer){
		case 1:
			displayTrips(trips); 
			break
		case 2:
			BuyTicket(trips, tickets)
			break
		case 3:
			DeletTicket(tickets)
			break
		case 4:
			Show_Tickets(tickets, trips)
			break
		case 5:
			SearchForTicket(tickets,trips);
			break
		case 6:
			FilterTrips(trips)
			break;
		case 7:
			SearchByPrice(trips)
			console
			break;
		case 8: 
			return
		default:
			console.log("invalid.please choose from[1 to 8]")}
	}
}
Generate(trips,tickets)


