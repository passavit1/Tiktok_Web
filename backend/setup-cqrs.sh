
# Check if a domain name was provided
if [ -z "$1" ]; then
  echo "Please provide a domain name (e.g., Product, User)."
  exit 1
fi

# Base directory for the CQRS structure
DOMAIN=$1
BASE_DIR=src/CQRS/$DOMAIN

# Create directory structure
mkdir -p $BASE_DIR/commands
mkdir -p $BASE_DIR/queries
mkdir -p $BASE_DIR/models
mkdir -p $BASE_DIR/routes
mkdir -p $BASE_DIR/controllers

# Create command files
touch $BASE_DIR/commands/create${DOMAIN}.js
touch $BASE_DIR/commands/update${DOMAIN}.js
touch $BASE_DIR/commands/delete${DOMAIN}.js

# Create query files
touch $BASE_DIR/queries/get${DOMAIN}.js
touch $BASE_DIR/queries/get${DOMAIN}s.js

# Create model file
touch $BASE_DIR/models/${DOMAIN}.js

# Create route file
touch $BASE_DIR/routes/${DOMAIN}Routes.js

# Create controller file
touch $BASE_DIR/controllers/${DOMAIN}Controller.js

# Confirmation message
echo "CQRS folder structure and files for '$DOMAIN' domain created successfully."
