


function renderTicket( tickets = [] ) {
	for (let i = 0; i < tickets; i++) {
		if ( i >= 4 ) break;
		
		const ticket = tickets[i];
		if ( !ticket ) break;

		const lblTicket = document.querySelector(`#lbl-ticket-${ i + 1 }`);
		const lblDesk = document.querySelector(`#lbl-desk-${ i + 1 }`);

		lblTicket.innerText = `Ticket ${ ticket.number }`;
		lblDesk.innerText = `Escritorio ${ ticket.handleAtDesk }`;
	}
}


async function loadCurrentTickets() {
  const resp = await fetch('/api/ticket/working-on').then( resp => resp.json() );
  renderTicket( resp );
}

loadCurrentTickets();