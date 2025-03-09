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

// Task 3: Highlighting High Priority Tickets
function highlightHighPriorityTickets() {
    const highPriorityTickets = Array.from(document.querySelectorAll('.high-priority'));
    highPriorityTickets.forEach(ticket => {
        ticket.style.border = '2px solid red';
        ticket.style.backgroundColor = '#ffcccc';
    });
}

// Task 4: Implementing Ticket Resolution with Event Bubbling
ticketContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('support-ticket')) {
        console.log('Support ticket clicked!');
    }
});

// Task 5: Inline Editing of Support Tickets
function enableInlineEditing(ticket) {
    ticket.addEventListener('dblclick', (event) => {
        event.stopPropagation();

        const heading = ticket.querySelector('h2');
        const description = ticket.querySelector('p');
        const priorityLabel = ticket.querySelector('span');

        const nameInput = document.createElement('input');
        nameInput.value = heading.textContent;

        const issueInput = document.createElement('input');
        issueInput.value = description.textContent;

        const priorityInput = document.createElement('input');
        priorityInput.value = priorityLabel.textContent.replace('Priority: ', '');

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.onclick = (event) => {
            event.stopPropagation();
            heading.textContent = nameInput.value;
            description.textContent = issueInput.value;
            priorityLabel.textContent = `Priority: ${priorityInput.value}`;

            ticket.replaceChild(heading, nameInput);
            ticket.replaceChild(description, issueInput);
            ticket.replaceChild(priorityLabel, priorityInput);
            ticket.removeChild(saveButton);
        };

        ticket.replaceChild(nameInput, heading);
        ticket.replaceChild(issueInput, description);
        ticket.replaceChild(priorityInput, priorityLabel);
        ticket.appendChild(saveButton);
    });
}

// Load sample support tickets
window.onload = () => {
    const tickets = [
        { name: 'Alice Walker', issue: 'Cannot reset password', priority: 'High' },
        { name: 'Bob Johnson', issue: 'Email not working', priority: 'Medium' },
        { name: 'Charlie Smith', issue: 'Laptop overheating', priority: 'Low' },
        { name: 'Diana Prince', issue: 'VPN connection issues', priority: 'High' }
    ];

    tickets.forEach(ticket => addSupportTicket(ticket.name, ticket.issue, ticket.priority));
};
