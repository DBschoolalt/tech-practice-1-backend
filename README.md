# tech-practice-1-backend

# Build instructions

This project is built with Node.js and TypeScript, make sure you have all dependencies installed.

Open terminal in project folder and run `build` with npm

```
npm run build
```

Your compiled typescript should be locked in `dist` folder of the project

# Run instructions

Make sure you have compiled the project beforehand, open terminal in project folder and use the `run` command with npm

```
npm run run
```
# Using the unit-tests

you must have `jasmine` installed before you can do the unit tests.

Open terminal in project folder and run `test` with npm

```
npm test
```

Alternatively you can just open the `test.bat` file.

# API

You can access the API documentation by running the app and then in your web browser navigating to the /api route (http://localhost:3000/api/)

**/items/get** - Returns all available items.

**/items/post** - Creates new item from body of the request, item ID must be unique.

**/items/{id}/get** - Returns item with specified ID.

**/items/{id}/patch** - Updates item with Specified ID using body of the request, ID will not be changed/

**/items/{id}/delete** - Removes item with specified ID.

**/items/{id}** - Returns item with specified ID.

**/customers/get** - Returns all customers.

**/customers/{id}/get** - Returns customer with specified ID.

**/customers/{id}/post** - Creates new customer from body of the request, ID must be unique.

**/customers/{id}/delete** - Removes customer with specified ID.

**/customers/{id}/cart/get** - Returns cart of customer with specified ID.

**/customer/{id}/cart/delete** - Clear cart of customer with specified ID.

**/customer/{id}/cart/{item_id}/post** - Add item with specified item_id to cart with specified id

**/customer/{id}/cart/{item_id}/delete** - Remove item with specified item_id from cart with specified id

# Architecture

<img width="292" height="271" alt="image" src="https://github.com/user-attachments/assets/e96eeffd-c4fd-4aea-9d05-0cf8c6c33e19" />

General architecture of the app (both back-end and front-end)

<img width="637" height="400" alt="image" src="https://github.com/user-attachments/assets/117fb3ed-d4fb-4afd-9d7a-aa9fe2bf0c77" />

General architecture of the back-end part (this repository)

**Logger** - a logger object, has ability to log messages into terminal.

**Item** - a type for each Item present in store catalog or user cart, contains information about the item.

**Customer** - a type for Customer, currently using the application, Customers only store their ID and items in their cart.

**Item Manager** - class responsible for managing all the items present in the store. Can add, remove, modify and save/load items from disk.

**Customer Manager** - much like the Item Manager class, except modifies customers and their carts. Does not have ability to store customer data on disk.

**Item Data** - class for abstracting interactions with the database. Has two methods for getting and saving data on disk.

**API** - app.ts, connects all the previous parts and sets up API using swagger.
