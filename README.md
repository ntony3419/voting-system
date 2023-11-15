# voting-system
## Prequisite
- mongodb
- python3
- flask
- gunicorn

## Installation
### Database mongoDB
- Database's location is /data/mongodb


# Start the MongoDB Shell and connect to your MongoDB instance
mongosh "mongodb://localhost:27017"
# Switch to the database that contains your users collection
use voting_system
# List all documents in the users collection
db.users.find({})
# If you want to pretty print the output
db.users.find({}).pretty()



#!/bin/bash

# Exit on any error
set -e

# Update and Upgrade the System
sudo apt-get update && sudo apt-get upgrade -y

# Install Nginx
sudo apt-get install nginx -y

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB and Enable it to start on boot
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Python3, pip and virtualenv
sudo apt-get install python3-pip python3-dev -y
sudo pip3 install virtualenv

# Setup the application directory
sudo mkdir -p /var/www/voting-system
sudo chown -R www-data:www-data /var/www/voting-system

# Create and activate virtual environment
cd /var/www/voting-system
virtualenv env
source env/bin/activate

# Install Gunicorn in virtual environment
pip install gunicorn

# Install Flask and other dependencies
pip install flask # Add other packages as needed

# Set up Gunicorn systemd service
cat << EOF | sudo tee /etc/systemd/system/gunicorn.service
[Unit]
Description=Gunicorn instance to serve my Flask app
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/voting-system
Environment="PATH=/var/www/voting-system/env/bin"
ExecStart=/usr/local/bin/gunicorn --workers 4 --bind 0.0.0.0:8000 app:app

[Install]
WantedBy=multi-user.target
EOF

# Start Gunicorn service
sudo systemctl start gunicorn
sudo systemctl enable gunicorn

# Set up Nginx to proxy to Gunicorn
cat << EOF | sudo tee /etc/nginx/sites-available/voting-system
server {
    listen 80;
    server_name REPLACE_WITHDOMAIN_OR_IP;  

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

    }

    location /static {
        alias /var/www/voting-system/static;
    }
}
EOF

# Enable the Nginx server block
sudo ln -s /etc/nginx/sites-available/voting-system /etc/nginx/sites-enabled

# Test Nginx configuration and reload
sudo nginx -t
sudo systemctl reload nginx

# Print deployment status
echo "Deployment has been completed successfully."

## database
# Set the path to the MongoDB data directory
MONGODB_DATA_DIR="/data/mongodb"
BACKUP_DIR="/data/mongodb/backup"

# Stop the MongoDB service before backup
sudo systemctl stop mongod

# Create a backup of the MongoDB 'voting-system' database
mongodump --db voting-system --out $BACKUP_DIR

# Restart the MongoDB service
sudo systemctl start mongod

# Transfer the backup to the new server (replace with actual username and server address)
# SCP requires password authentication unless SSH keys are set up.
# scp -r $BACKUP_DIR username@new_server_ip:/path/to/destination

echo "MongoDB 'voting-system' database has been backed up and is ready for transfer."
