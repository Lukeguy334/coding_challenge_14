// Task 2: Adding Support Tickets Dynamically
const ticketContainer = document.getElementById('ticketContainer');

function addSupportTicket(name, issue, priority) {
    const ticket = document.createElement('div');
    ticket.className = 'support-ticket';

    // Add high-priority class if the ticket priority is 'High'
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

    // Enable inline editing
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
    // Double-click event for editing the ticket
    ticket.addEventListener('dblclick', (event) => {
        event.stopPropagation(); // Prevent event bubbling

        // Get current ticket data
        const heading = ticket.querySelector('h2');
        const description = ticket.querySelector('p');
        const priorityLabel = ticket.querySelector('span');

        // Create input fields to edit ticket data
        const nameInput = document.createElement('input');
        nameInput.value = heading.textContent;

        const issueInput = document.createElement('input');
        issueInput.value = description.textContent;

        const priorityInput = document.createElement('input');
        priorityInput.value = priorityLabel.textContent.replace('Priority: ', '');

        // Create a save button to apply changes
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';

        // Save button click event to save the changes
        saveButton.onclick = (event) => {
            event.stopPropagation(); // Prevent event bubbling

            // Update ticket with new values
            heading.textContent = nameInput.value;
            description.textContent = issueInput.value;
            priorityLabel.textContent = `Priority: ${priorityInput.value}`;

            // Replace input fields with updated content
            ticket.replaceChild(heading, nameInput);
            ticket.replaceChild(description, issueInput);
            ticket.replaceChild(priorityLabel, priorityInput);
            ticket.removeChild(saveButton);
        };

        // Replace static text with input fields and save button
        ticket.replaceChild(nameInput, heading);
        ticket.replaceChild(issueInput, description);
        ticket.replaceChild(priorityInput, priorityLabel);
        ticket.appendChild(saveButton);
    });
}

// Load sample support tickets when the page loads
window.onload = () => {
    const tickets = [
        { name: 'Alice Walker', issue: 'Cannot reset password', priority: 'High' },
        { name: 'Bob Johnson', issue: 'Email not working', priority: 'Medium' },
        { name: 'Charlie Smith', issue: 'Laptop overheating', priority: 'Low' },
        { name: 'Diana Prince', issue: 'VPN connection issues', priority: 'High' }
    ];

    tickets.forEach(ticket => addSupportTicket(ticket.name, ticket.issue, ticket.priority));
};
