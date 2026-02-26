document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/api/projects')
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projects-container');
            container.innerHTML = ''; // Clear loading text

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <p><strong>Tech:</strong> ${project.techStack.join(', ')}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
});
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const statusText = document.getElementById('form-status');

    statusText.innerText = "Sending...";

    try {
        const response = await fetch('https://portfolio-backend-tlj2.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();
        
        if (response.ok) {
            statusText.innerText = "Message sent successfully!";
            document.getElementById('contact-form').reset(); // Clear the form
        } else {
            statusText.innerText = `Error: ${result.message}`;
        }
    } catch (error) {
        statusText.innerText = "Failed to send message. Is the server running?";
    }
});