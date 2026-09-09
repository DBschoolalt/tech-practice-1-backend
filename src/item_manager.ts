import { Item } from "./item.js"
import { Logger } from "./logger.js"


export class ItemManager {
	_items: Item[];
	constructor() {
		this._items = [];
	}

	load(data: Item[]): void {
		this._items = data
	}

	findIndex(id: number): number {
		let found_item = this._items.findIndex(item => item.id === id);
		return found_item
		// if (found_item) {
		// 	return found_item
		// }
		// return -1
	}
	find(id: number): Item {
		let found_item = this._items.find(item => item.id === id);
		if (found_item) {
			return found_item
		}
		return { id: -1, name: 'no product', price: 0, amount: 0, desc: 'no product, something went wrong', image_path: ''}
	}

	add(item: Item): void {
		if (this.findIndex(item.id) != -1) {
			Logger.log('ItemManager: add()', 'invalid ID provided' )
			return
		}
		this._items.push(item);
		Logger.log('ItemManager: add()', `Succesfully added item with ID of ${item.id}` )
	}

	changeItem(id: number, properties: Item): void {
		const index = this.findIndex(id)
		if (index == -1) {
			Logger.log('ItemManager: changeItem()', 'invalid ID provided' )
			return
		}

		if ("name" in properties) {
			this._items[index].name = properties.name
		}
		if ("price" in properties) {
			if (properties.price < 0) {properties.price = 0}
			this._items[index].price = properties.price
		}
		if ("desc" in properties) {
			this._items[index].desc = properties.desc
		}
		if ("image_path" in properties) {
			this._items[index].image_path = properties.image_path
		}
		if ("amount" in properties) {
			this._items[index].amount = properties.amount
		}
		Logger.log('ItemManager: changeItem()', `Succesfully changed properties of item with ID of ${id}` )
	}

	remove(id: number): void {
		let index = this.findIndex(id)
		if ( index != -1 ) {
			this._items.splice(index, 1);
			Logger.log('ItemManager: remove()', `Succesfully removed item with ID of ${id}` )
		}
	}

	get_all(): Item[] {
		return this._items;
	}
}