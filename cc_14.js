// Task 2: Adding Support Tickets Dynamically
const ticketContainer = document.getElementById('ticketContainer');

// Function to add support tickets dynamically
function addSupportTicket(name, issue, priority) {
    // Create the ticket div
    const ticket = document.createElement('div');
    ticket.className = 'support-ticket';

    // Add priority class if needed
    if (priority.toLowerCase() === 'high') {
        ticket.classList.add('high-priority');
    }

    // Create ticket elements (heading, description, priority label, resolve button)
    const heading = document.createElement('h2');
    heading.textContent = name;

    const description = document.createElement('p');
    description.textContent = issue;

    const priorityLabel = document.createElement('span');
    priorityLabel.textContent = `Priority: ${priority}`;

    const resolveButton = document.createElement('button');
    resolveButton.textContent = 'Resolve';
    
    // Resolve button event listener to remove the ticket
    resolveButton.onclick = (event) => {
        event.stopPropagation(); // Prevent event bubbling
        ticketContainer.removeChild(ticket); // Remove the ticket from container
    };

    // Append elements to ticket
    ticket.appendChild(heading);
    ticket.appendChild(description);
    ticket.appendChild(priorityLabel);
    ticket.appendChild(resolveButton);

    // Append the ticket to the ticket container
    ticketContainer.appendChild(ticket);
}

// Task 3: Highlighting High Priority Tickets
function highlightHighPriorityTickets() {
    // Get all tickets with the 'high-priority' class
    const highPriorityTickets = Array.from(document.querySelectorAll('.high-priority'));

    // Highlight the high-priority tickets
    highPriorityTickets.forEach(ticket => {
        ticket.style.border = '2px solid red'; // Red border
        ticket.style.backgroundColor = '#ffcccc'; // Light red background for high priority
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
    // Add double-click event listener for editing
    ticket.addEventListener('dblclick', (event) => {
        event.stopPropagation(); // Prevent event bubbling to parent elements

        // Get current content of the ticket
        const heading = ticket.querySelector('h2');
        const description = ticket.querySelector('p');
        const priorityLabel = ticket.querySelector('span');

        // Create input fields to replace static content
        const nameInput = document.createElement('input');
        nameInput.value = heading.textContent;

        const issueInput = document.createElement('input');
        issueInput.value = description.textContent;

        const priorityInput = document.createElement('input');
        priorityInput.value = priorityLabel.textContent.replace('Priority: ', '');

        // Create a save button to save the edited content
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';

        // Save button event listener to update the ticket
        saveButton.onclick = (event) => {
            event.stopPropagation(); // Prevent event bubbling

            // Update the ticket with the new values
            heading.textContent = nameInput.value;
            description.textContent = issueInput.value;
            priorityLabel.textContent = `Priority: ${priorityInput.value}`;

            // Replace the input fields with the updated static content
            ticket.replaceChild(heading, nameInput);
            ticket.replaceChild(description, issueInput);
            ticket.replaceChild(priorityLabel, priorityInput);
            ticket.removeChild(saveButton);
        };

        // Replace the static content with input fields and save button
        ticket.replaceChild(nameInput, heading);
        ticket.replaceChild(issueInput, description);
        ticket.replaceChild(priorityInput, priorityLabel);
        ticket.appendChild(saveButton);
    });
}
