import express from 'express';
import cors from "cors"
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
const app = express();
const port = 3000;

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'CoffeeShop API',
			version: '1.0.0',
		}
	},
	apis: [`./src/app.ts`],
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)

app.use(cors());
app.use(express.static('public'));
app.use(express.json())
app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

import { ItemData } from './item_data.js'

import { ItemManager } from './item_manager.js'
const item_manager = new ItemManager

import { CustomerManager } from './customer_manager.js'
const customer_manager = new CustomerManager

customer_manager.add(1)

item_manager.load(ItemData.read())
ItemData.write(item_manager.get_all())
/**
 * @swagger
 * /items:
 *  get:
 *    description: Get all available items
 *    responses:
 *      200:
 *        description: success
 *  post:
 *   description: Create new item
 *   parameters:
 *   - name: item
 *     description: Item to create, ID must be unique
 *     in: body
 *     required: true
 *     type: object
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: fail
 */
app.get('/items', (req, res) => {
	res.status(200).send(item_manager.get_all())
})
app.post('/items', (req, res) => {
	let new_item = req.body;
	if (item_manager.findIndex(new_item.id) != -1) {
		res.status(400).send( { message: 'Cannot overwrite existing items' } )
		return
	}
	item_manager.add(new_item)
	ItemData.write(item_manager.get_all())
	res.status(200).send( { message: `Created Item with ID of ${new_item.id}` } )
})

/**
 * @swagger
 * /items/{id}:
 *  get:
 *    description: If exists, get item with specified ID
 * 
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 * 
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: fail
 * 
 *  patch:
 *   description: If exists, update item with specified ID
 * 
 *   parameters:
 *   - name: id
 *     in: path
 *     description: ID of item to update
 *     required: true
 *     schema:
 *      type: integer
 *      minimum: 1
 * 
 *   - name: properties
 *     description: Properties to update
 *     in: body
 *     required: true
 *     type: object
 * 
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: fail
 * 
 *  delete:
 *   description: If exists, remove item with specified ID
 * 
 *   parameters:
 *   - name: id
 *     in: path
 *     description: ID of item to update
 *     required: true
 *     schema:
 *      type: integer
 *      minimum: 1
 * 
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: fail
 */

app.get('/items/:id', (req, res) => {
	let id = parseInt(req.params.id);
	if (item_manager.findIndex(id) == -1) {
		res.status(400).send( { message: 'no item with such ID exists' } )
		return
	}
	res.status(200).send(item_manager.find(id))
})
app.patch('/items/:id', (req, res) => {
	let id = parseInt(req.params.id);
	if (item_manager.findIndex(id) == -1) {
		res.status(400).send( { message: 'no item with such ID exists' } )
		return
	}

	const new_properties = req.body

	item_manager.changeItem(id, new_properties)
	ItemData.write(item_manager.get_all())

	res.status(200).send( { message: `Updated Item with ID of ${id}` } )
})
app.delete('/items/:id', (req, res) => {
	let id = parseInt(req.params.id);

	item_manager.remove(id)
	ItemData.write(item_manager.get_all())
	res.status(200).send( { message: `Removed Item with ID of ${id}` } )
})




















/**
 * @swagger
 * /customers:
 *  get:
 *    description: Get all customers
 *    responses:
 *      200:
 *        description: success
 */
app.get('/customers', (req, res) => {
	res.status(200).send(customer_manager.get_all())
})


/**
 * @swagger
 * /customers/{id}:
 *  get:
 *    description: If exists, get item with specified ID
 * 
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 * 
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: fail
 * 
 *  post:
 *   description: create customer with specified ID, if doesn't exist already
 * 
 *   parameters:
 *   - name: id
 *     in: path
 *     description: ID of customer to create
 *     required: true
 *     schema:
 *      type: integer
 *      minimum: 1
 * 
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: fail
 * 
 *  delete:
 *   description: If exists, remove customer with specified ID
 * 
 *   parameters:
 *   - name: id
 *     in: path
 *     description: ID of item to update
 *     required: true
 *     schema:
 *      type: integer
 *      minimum: 1
 * 
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: fail
 */

app.get('/customers/:id', (req, res) => {
	let id = parseInt(req.params.id);
	if (customer_manager.findIndex(id) == -1) {
		res.status(400).send( { message: 'no Customer with such ID exists' } )
		return
	}
	res.status(200).send(customer_manager.find(id))
})
app.post('/customers/:id', (req, res) => {
	let id = parseInt(req.params.id);
	if (customer_manager.findIndex(id) != -1) {
		res.status(400).send( { message: 'Cannot overwrite existing customers' } )
		return
	}
	customer_manager.add(id)
	res.status(200).send( { message: `Created Customer with ID of ${id}` } )
})
app.delete('/customers/:id', (req, res) => {
	let id = parseInt(req.params.id);

	customer_manager.remove(id)

	res.status(200).send( { message: `Removed Customer with ID of ${id}` } )
})


/**@swagger
 * /customers/{id}/cart:
 *  get:
 *    description: If exists, get cart of customer with specified ID
 * 
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 * 
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: fail
 */
app.get('/customers/:id/cart', (req, res) =>{
	let id = parseInt(req.params.id);
	if (customer_manager.findIndex(id) == -1) {
		res.status(400).send( { message: 'no Customer with such ID exists' } )
		return
	}
	res.status(200).send(customer_manager.getCart(id))
})

/**@swagger
 * /customers/{id}/cart:
 *  delete:
 *    description: If exists, get clear cart of customer with specified ID
 * 
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 * 
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: fail
 */
app.delete('/customers/:id/cart', (req, res) =>{
	let id = parseInt(req.params.id);
	if (customer_manager.findIndex(id) == -1) {
		res.status(400).send( { message: 'no Customer with such ID exists' } )
		return
	}
	customer_manager.clearCart(id)
	res.status(200).send( { message: `Cleared cart of Customer with ID of ${id}` } )
})

/**@swagger
 * /customers/{id}/cart/{item_id}:
 *  post:
 *    description: add item with specified item_id to cart with specified id
 * 
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 *    - in: path
 *      name: item_id
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 * 
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: fail
 */
app.post('/customers/:id/cart/:item_id', (req, res) =>{
	let id = parseInt(req.params.id);
	let item_id = parseInt(req.params.item_id);

	if (customer_manager.findIndex(id) == -1) {
		res.status(400).send( { message: 'no Customer with such ID exists' } )
		return
	}

	if (item_manager.findIndex(item_id) == -1) {
		res.status(400).send( { message: 'no Item with such ID exists' } )
		return
	}
	customer_manager.addToCart(id, item_manager.find(item_id))
	res.status(200).send({ message: `added item ${item_id} to cart of Customer with ID of ${id}` } )
})

/**@swagger
 * /customers/{id}/cart/{item_id}:
 *  delete:
 *    description: remove item with specified item_id from cart with specified id
 * 
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 *    - in: path
 *      name: item_id
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 * 
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: fail
 */
app.delete('/customers/:id/cart/:item_id', (req, res) =>{
	let id = parseInt(req.params.id);
	let item_id = parseInt(req.params.item_id);

	if (customer_manager.findIndex(id) == -1) {
		res.status(400).send( { message: 'no Customer with such ID exists' } )
		return
	}
	customer_manager.removeFromCart(id, item_id)
	res.status(200).send({ message: `removed item ${item_id} from cart of Customer with ID of ${id}` } )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});