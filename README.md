# BookRent: One Book at a Time -- Rent and Expand Your Mind
You can access the web app with this url:
```
https://book-rental-system-client.vercel.app/
```

You can access the api with this url:
```
https://book-rental-system-api.vercel.app/
```

## Backend Development Process

### Here's the latest API documentation:
https://book-rental-system-api.vercel.app/api/api-docs

### You can start the development process by running these commands:

1. Installing dependencies
```
npm install
```
2. Add .env like this in your root directory
```
DB_USER=
DB_PASS=
DB_NAME=
DB_HOST=
```
Then, migrate the existing schema to your local database
```
npx sequelize db:migrate
```
3. Running the app
```
npm dev
```

## Frontend Development Process

### You can start the development process by running these commands:

1. Installing dependencies
```
npm install
```
2. Running the app
```
npm dev
```