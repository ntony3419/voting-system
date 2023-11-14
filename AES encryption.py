# Import the necessary libraries
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
import base64

# ...

# Add a function to generate a random AES key
def generate_random_key():
    return get_random_bytes(32)  # 256 bits key

# Update the add_user function to include encryption
@app.route('/add-user', methods=['POST'])
def add_user():
    name = request.form['name']
    age = request.form['age']
    position = request.form['position']

    # Generate a random key for this transaction
    random_key = generate_random_key()

    # Encrypt user data
    encrypted_name = encrypt_text(random_key, name)
    encrypted_age = encrypt_text(random_key, age)
    encrypted_position = encrypt_text(random_key, position)

    # Store the encrypted data and the random key in MongoDB
    user_id = users.insert_one({
        'name': encrypted_name,
        'age': encrypted_age,
        'position': encrypted_position,
        'key': base64.b64encode(random_key).decode('utf-8')
    }).inserted_id

    return jsonify({'id': str(user_id)})

# Add AES encryption functions
def encrypt_text(key, text):
    cipher = AES.new(key, AES.MODE_CBC, iv=get_random_bytes(16))
    ciphertext = cipher.encrypt(pad(text.encode('utf-8'), AES.block_size))
    return base64.b64encode(cipher.iv + ciphertext).decode('utf-8')

def decrypt_text(key, text):
    data = base64.b64decode(text)
    iv = data[:16]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    plaintext = unpad(cipher.decrypt(data[16:]), AES.block_size)
    return plaintext.decode('utf-8')
