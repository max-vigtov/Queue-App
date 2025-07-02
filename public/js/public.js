


function renderTickets( tickets = [] ) {
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
  renderTickets( resp );
}

function connectToWebSockets() {

  const socket = new WebSocket( 'ws://localhost:3000/ws' );

  socket.onmessage = ( event ) => {
		const { type, payload } = JSON.parse( event.data );

		if( type !== 'on-working-on-tickets-changed') return;
		renderTickets();

  };

  socket.onclose = ( event ) => {
    setTimeout( () => {
      connectToWebSockets();
    }, 1500 );

  };

  socket.onopen = ( event ) => {
    console.log( 'Connected' );
  };
}

loadCurrentTickets();
connectToWebSockets();