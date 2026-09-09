import { Item } from "./item.js"
import { Customer } from "./customer.js"
import { Logger } from "./logger.js"

export class CustomerManager {
	_customers: Customer[];
	constructor() {
		this._customers = [];
	}

	load(data: Customer[]): void {
		this._customers = data
	}

	findIndex(id: number): number {
		let found_item = this._customers.findIndex(item => item.id === id);
		return found_item
		// if (found_item) {
		// 	return found_item
		// }
		// return -1
	}
	find(id: number): Customer {
		let found_item = this._customers.find(item => item.id === id);
		if (found_item) {
			return found_item
		}
		return { id: -1, cart: []}
	}

	add(id: number): void {
		if (this.findIndex(id) != -1) {
			Logger.log('CustomerManager: add()', 'invalid ID provided' )
			return
		}
		this._customers.push({id: id, cart: []});
		Logger.log('CustomerManager: add()', `Succesfully added item with ID of ${id}` )
	}

	getCart(id: number): Item[] {
		if (this.findIndex(id) == -1) {
			Logger.log('CustomerManager: get_cart()', 'invalid ID provided' )
			return []
		}
		return this.find(id).cart
	}

	removeFromCart(id: number, item_id: number): void {
		const index = this.findIndex(id)
		if (index == -1) {
			Logger.log('CustomerManager: remove_from_cart()', 'invalid ID provided' )
			return
		}
		const cart = this.getCart(id)
		let item_index = this._customers[index].cart.findIndex(item => item.id === item_id)
		if (item_index != -1) {
			this._customers[index].cart.splice(item_index, 1);
			Logger.log('CustomerManager: remove_from_cart()', `Succesfully removed item with ID of ${item_id} from cart with ID of ${id}` )
			return
		}
	}

	clearCart(id: number): void {
		let index = this.findIndex(id);
		if (index != -1) {
			this._customers[index].cart.splice(0, this._customers[index].cart.length);
		}
	}

	addToCart(id: number, item: Item): void {
		let index = this.findIndex(id)
		if (index != -1) {
			item.amount = 1
			this._customers[index].cart.push(item);
		}
	}

	// change(id: number, properties: Item): void {
	// 	const index = this.findIndex(id)
	// 	if (index == -1) {
	// 		Logger.log('ItemManager: changeItem()', 'invalid ID provided' )
	// 		return
	// 	}

	// 	if ("name" in properties) {
	// 		this._customers[index].name = properties.name
	// 	}
	// 	if ("price" in properties) {
	// 		if (properties.price < 0) {properties.price = 0}
	// 		this._customers[index].price = properties.price
	// 	}
	// 	if ("desc" in properties) {
	// 		this._customers[index].desc = properties.desc
	// 	}
	// 	if ("image_path" in properties) {
	// 		this._customers[index].image_path = properties.image_path
	// 	}
	// 	if ("amount" in properties) {
	// 		this._customers[index].amount = properties.amount
	// 	}
	// 	Logger.log('ItemManager: changeItem()', `Succesfully changed properties of item with ID of ${id}` )
	// }

	remove(id: number): void {
		let index = this.findIndex(id)
		if ( index != -1 ) {
			this._customers.splice(index, 1);
			Logger.log('CustomerManager: remove()', `Succesfully removed item with ID of ${id}` )
		}
	}

	get_all(): Customer[] {
		return this._customers;
	}
}