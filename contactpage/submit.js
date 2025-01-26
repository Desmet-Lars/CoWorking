        // Initialize Firestore
        const db = firebase.firestore();

        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!name || !email || !message) {
                document.getElementById('statusMessage').textContent = 'Please fill in all fields';
                return;
            }

            try {
                await db.collection('messages').add({
                    name: name,
                    email: email,
                    message: message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

                document.getElementById('contactForm').reset();
                document.getElementById('statusMessage').textContent = 'Message sent successfully!';
                document.getElementById('statusMessage').style.color = 'green';
            } catch (error) {
                document.getElementById('statusMessage').textContent = 'Error sending message. Please try again.';
                document.getElementById('statusMessage').style.color = 'red';
                console.error('Error:', error);
            }
        });
