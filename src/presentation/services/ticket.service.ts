import { UuidAdapter } from "../../config/uuid.adpter";
import { Ticket } from '../../domain/interface/tickets';


export class TicketService {

	private readonly tickets: Ticket[] = [
		{ id: UuidAdapter.v4(), number: 1, createdAt: new Date(), done: false },
		{ id: UuidAdapter.v4(), number: 2, createdAt: new Date(), done: false },
		{ id: UuidAdapter.v4(), number: 3, createdAt: new Date(), done: false },
		{ id: UuidAdapter.v4(), number: 4, createdAt: new Date(), done: false },
		{ id: UuidAdapter.v4(), number: 5, createdAt: new Date(), done: false },
		{ id: UuidAdapter.v4(), number: 6, createdAt: new Date(), done: false },
	];

	public get pendingTickets(): Ticket[] {
		return this.tickets.filter( ticket => !ticket.handleAtDesk );
	}

	public lastTicketNumber () {
		return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
	}

	public createTicker(): Ticket {
		const ticket: Ticket = {
			id: UuidAdapter.v4(),
			number: this.lastTicketNumber() + 1,
			createdAt: new Date(),
			done: false,
			handleAt: undefined,
			handleAtDesk: undefined,
		}

		this.tickets.push( ticket );
		//TODO: WS

		return ticket;
	}

	public drawTicket( desk: string) {
		const ticket = this.tickets.find( t => !t.handleAtDesk );
		if ( !ticket ) return { status: 'error', message: 'No tickets available' };

		ticket.handleAtDesk = desk;
		ticket.handleAt = new Date();
		
		//TODO: WS

		return { status: 'ok', ticket }
	}

	public onFinished( id: string) {
		const ticket = this.tickets.find( t => t.id === id );
		if ( !ticket ) return { status: 'error', message: 'Ticket not found'};
		
		this.tickets.map( ticket => {
			if ( ticket.id === id ) {
				ticket.done = true;
			
			} 
			return ticket;
		});
		return { status: 'ok' };
	}
}