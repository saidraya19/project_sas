const trips = require("./data.js");
const  input = require('readline-sync')
function validnumber(prompte)
{
        while(true)
        {
                let value = input.question(prompte)
                let num = Number(value)
                if(!isNaN(num) && value.trim() !== "" && Number.isInteger(num) && num >= 0)
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
                        return value.trim().toLowerCase();
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
function print_tecket(cart,find)
{
                console.log("===========================================")
                console.log(`ticket :#${cart.id}`)
                console.log(`Passager :${cart.passengerName}`)
                console.log(`Trajet :${find.departure} -> ${find.destination}`)
                console.log(`price :${cart.price}`)
                console.log(`seat: ${cart.seatNumber}`)
                console.log("===========================================")
}
let tickets = []
/*let tickets = [
    { id: 1,  passengerName: "Ahmed",  tripid: 3,  seatNumber: 1, price: 140 },
    { id: 2,  passengerName: "Ahmed",  tripid: 1,  seatNumber: 2, price: 25  },
    { id: 3,  passengerName: "Ahmed",  tripid: 2,  seatNumber: 3, price: 90  },
    { id: 4,  passengerName: "Fatima", tripid: 6,  seatNumber: 4, price: 120 },
    { id: 5,  passengerName: "Omar",   tripid: 4,  seatNumber: 5, price: 65  },
    { id: 6,  passengerName: "Imane",  tripid: 7,  seatNumber: 6, price: 150 },
    { id: 7,  passengerName: "Hamza",  tripid: 8,  seatNumber: 7, price: 40  },
    { id: 8,  passengerName: "Salma",  tripid: 10, seatNumber: 8, price: 30  },
    { id: 9,  passengerName: "Mehdi",  tripid: 11, seatNumber: 9, price: 95  },
    { id: 10, passengerName: "Aya",    tripid: 5,  seatNumber: 10, price: 110 },
    { id: 11, passengerName: "Adam",   tripid: 3,  seatNumber: 11, price: 140 },
    { id: 12, passengerName: "Nour",   tripid: 3,  seatNumber: 12, price: 140 }
];*/
function ExistIdToAdd(tickets)
{
	let id = 1;
	while(true)
	{
		let exists = false
		for(const cart of tickets)
		{
			if(cart.id === id)
			{
				exists = true;
				break
			}
		}
		if(!exists)
		{

			return id
		}
		id++
	}
}
function SeatsManage(tickets,tripid)
{
	let seat  = 1
	while(true)
	{
		let exist = false
		for(const cart of tickets)
		{
			if(cart.tripid === tripid && cart.seatNumber === seat)
			{
				exist = true;
				break
			}
		}
		if(!exist)
		{
			return seat
		}
		seat++;
	}
}
function BuyTicket(trips, tickets)
{
        console.clear();
        let name = validstring("Passenger name: ")
	name = name[0].toUpperCase() + name.slice(1);
        let tripid = validnumber("Trip id: ")
        let found = null
        for(const one_trip of trips)
        {
                if(tripid == one_trip.id)
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
		//	let seatNumber =  SeatsManage(tickets,found.id)
			let id = ExistIdToAdd(tickets)
                        let price = found.price;
                        found.availableSeats--
                        const cart = {id,passengerName: name,tripid,seatNumber,price}
                        tickets.push(cart);
                        console.log("Ticket purchased successfully.");
                        console.log("===========================================")
                        console.log(`ticket :#${cart.id}`)
                        console.log(`Passager :${cart.passengerName}`)
                        console.log(`Trajet :${found.departure} -> ${found.destination}`)
                        console.log(`price :${found.price}`);
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
                let found  = null
                for(const route of trips)
                {
                        if(ticket.tripid === route.id)
                        {
                                found = route
				break
                        }
                }
                if(found)
                {
                        print_tecket(ticket, found)
                }
        }
        input.question("Press Enter to return to menu...");
        return;

}
function DeletTicket(tickets,trips)
{
	
        while(true)
        {
                let find_ticket = null;
        let id_ticket = validnumber("enter id of ticket: ")
        for(const cart of tickets)
        {
                if(cart.id == id_ticket)
                {
                        find_ticket = cart;
                        break;
                }
        }
        if(!find_ticket)
        {
                console.log("this ticket not exist.")
                break;
        }
        else
        {
                for(const route of trips)
                {
                        if(find_ticket.tripid == route.id)
                        {
                                route.availableSeats += 1;
				break;
			}
		}
		let index = tickets.indexOf(find_ticket)
		tickets.splice(index,1)
                console.log("ticket removed successfully.")
	}
                let answer = validstring("do you want delet more tickets? enter Y/N: ")
                if(answer == "N" || answer == "n")
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
	PassangerName = PassangerName[0].toUpperCase() + PassangerName.slice(1);
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
	trip = trip[0].toUpperCase() + trip.slice(1);
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
function SearchByPrice(trips,)
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
        console.log("Total revenue :", sum);
        let min = trips[0];
        for(const route of trips)
        {
                if(min.availableSeats > route.availableSeats)
                {
                        min = route;
                }
        }
        console.log(" Trajet le plus vendu ")
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
                console.clear();
                Menu();
        answer = validnumber("choose what do you want to do? from[1 to 8] :")
        switch(answer){
                case 1:
                        console.clear();
                        displayTrips(trips);
                        break
                case 2:
                        console.clear();
                        BuyTicket(trips, tickets)
                        break
                case 3:
                        DeletTicket(tickets, trips)
                        break
                case 4:
			Show_Tickets(tickets, trips)
                        break
                case 5:
                        console.clear();
                        SearchForTicket(tickets,trips);
                        break
                case 6:
                        console.clear();
                        FilterTrips(trips)
                        break;
                case 7:
			SearchByPrice(trips)
                        console
                        break;
                case 8:
                        Statistiques(tickets)
                        break
                case 0:
                        return
                default:
                        console.log("invalid.please choose from[1 to 8]")}
        }
}
Generate(trips,tickets)
