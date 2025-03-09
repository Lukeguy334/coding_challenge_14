// Task 2: Adding Support Tickets Dynamically
const ticketContainer = document.getElementById('ticketContainer');

function addSupportTicket(name, issue, priority) {
    const ticket = document.createElement('div');
    ticket.className = 'support-ticket';
    if (priority.toLowerCase() === 'high') {
        ticket.classList.add('high-priority');
    }

    const heading = document.createElement('h2');
    heading.textContent = name;

    const description = document.createElement('p');
    description.textContent = issue;

    const priorityLabel = document.createElement('span');
    priorityLabel.textContent = `Priority: ${priority}`;

    const resolveButton = document.createElement('button');
    resolveButton.textContent = 'Resolve';
    resolveButton.onclick = (event) => {
        event.stopPropagation();
        ticketContainer.removeChild(ticket);
    };

    ticket.appendChild(heading);
    ticket.appendChild(description);
    ticket.appendChild(priorityLabel);
    ticket.appendChild(resolveButton);
    ticketContainer.appendChild(ticket);

    enableInlineEditing(ticket);
}