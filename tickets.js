const createTicket = (email, ticket) => {
    if (!(ticket.department && ticket.details.length)) {
        displayErrors(["Please complete all fields before submiting a new ticket. Thank You."]);
        return;
    }
    const user = JSON.parse(localStorage.getItem(`${LS_EMAIL_PREFIX}${email}`));
    user.tickets.push(ticket);
    localStorage.setItem(`${LS_EMAIL_PREFIX}${email}`, JSON.stringify(user));
    viewTickets(email);
}

const deleteTicket = (email, ticketIdx) => {
    const user = JSON.parse(localStorage.getItem(`${LS_EMAIL_PREFIX}${email}`));
    const ticket = user.tickets[ticketIdx];
    if (confirm(`Are you sure you would like to delete ticket ${ticket.id} from ${ticket.name}?`) === true) {
        user.tickets.splice(ticketIdx, 1)
        localStorage.setItem(`${LS_EMAIL_PREFIX}${email}`, JSON.stringify(user));
        viewTickets(email);
    }
}

const viewTickets = (currentUserEmail) => {
    const user = JSON.parse(localStorage.getItem(`${LS_EMAIL_PREFIX}${currentUserEmail}`));

    const ticketHeader = [
        'id',
        'title',
        'priority',
        'status',
    ];

    const ticketFields = [
        {name: 'title', type: "text", test: "Hello Ticket", required: true},
        {name: 'name', type: "text", test: "First Last"},
        {name: 'email', type: "email", test: "person@example.com"},
        {name: 'phone', type: "text", test: "18885551234"},
    ];
    
    render('tickets', 'app', {
        user,
        ticketHeader,
        ticketFields,
        numHeaderFields: ticketHeader.length + 1,
        priorities: ['Low', 'Medium', 'High'],
        departments: [
            'Sales',
            'Accounting',
            'Admin',
        ],
        randString: () => generateId(4),
        ticketRows: () => {
            return user.tickets.map((k, idx) => {
                return {
                    ticketIdx: idx,
                    headerFields: ticketHeader.map((f) => k[f]),
                    detailFields: k,
                };
            });
        },
    });
    document.querySelector('#ticket-rows').addEventListener('click', (e) => {
        if (e.target.classList.contains('ticket')) {
            const ticketRow = e.target.dataset;
            switch (ticketRow.action) {
                case 'delete':
                    deleteTicket(currentUserEmail, ticketRow.ticketIdx);
                    return;
                case 'details':
                    document.getElementById(`ticket-details-${ticketRow.ticketIdx}`).classList.toggle('hidden');
                    document.getElementById(`ticket-row-${ticketRow.ticketIdx}`).classList.toggle('bg-blue-200');
                    return;
            }
        }
    });

    document.getElementById('create-ticket').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTicket = {
            id: generateId(4),
        };
        ticketFields.map(field => {
            newTicket[field.name] = formData.get(field.name);
        });
        newTicket.details = formData.get('details');
        newTicket.department = formData.get('department');
        newTicket.priority = formData.get('priority');
        newTicket.status = 'Open';

        createTicket(currentUserEmail, newTicket);
    }
}