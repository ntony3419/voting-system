<!-- Include this script in your HTML file -->

    async function generateRandomKey() {
        return crypto.subtle.generateKey(
            { name: 'AES-CBC', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
    }

    async function encryptText(randomKey, text) {
        const iv = crypto.getRandomValues(new Uint8Array(16));
        const encodedText = new TextEncoder().encode(text);
        const encryptedData = await crypto.subtle.encrypt(
            { name: 'AES-CBC', iv },
            randomKey,
            encodedText
        );

        return {
            iv: btoa(String.fromCharCode.apply(null, iv)),
            encryptedData: btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedData)))
        };
    }

    // ...

    // Modify the addUser function to include encryption
    function addUser() {
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const position = document.getElementById('position').value;

        // Generate a random key for this transaction
        generateRandomKey().then(randomKey => {
            // Encrypt user data
            encryptText(randomKey, name)
                .then(encryptedName => {
                    encryptText(randomKey, age)
                        .then(encryptedAge => {
                            encryptText(randomKey, position)
                                .then(encryptedPosition => {
                                    // Send the encrypted data and the random key to the server
                                    fetch('/add-user', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            name: encryptedName,
                                            age: encryptedAge,
                                            position: encryptedPosition,
                                            key: btoa(String.fromCharCode.apply(null, new Uint8Array(randomKey)))
                                        }),
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            console.log('Success:', data);
                                            // Handle success - maybe update the UI or show a message
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            // Handle errors here
                                        });
                                });
                        });
                });
        });
    }

    // You can similarly modify the fetchUserData function for decryption

