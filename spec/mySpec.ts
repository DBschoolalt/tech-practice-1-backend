import { ItemManager } from "../dist/item_manager.js";
import { CustomerManager } from "../dist/customer_manager.js";
import { ItemData } from "../dist/item_data.js";
import fs from 'fs';


describe('ItemData', function() {
	it('should be able to get the item data', function() {
		expect( ItemData.read() ).toEqual( JSON.parse(fs.readFileSync('./data/item_data.json', 'utf8')) );
	});
});

describe('ItemManager', function() {
	let item_manager;
	let item_data;

	beforeEach(function() {
		item_manager = new ItemManager();
		item_data = [
			{"id":1,"name":"item1", "desc": "item number 1", "price":1,"amount":1, "image_path": "path/to/image"},
			{"id":2,"name":"item2", "desc": "item number 2", "price":2,"amount":2, "image_path": "path/to/image"},
			{"id":3,"name":"item3", "desc": "item number 3", "price":3,"amount":3, "image_path": "path/to/image"},
			{"id":4,"name":"item4", "desc": "item number 4", "price":4,"amount":4, "image_path": "path/to/image"},
		]
	});

	it('should be able to load items', function() {
		item_manager.load(item_data);
		expect( item_manager.get_all() ).toEqual( item_data );
	});

	it('should be able to add items', function() {
		let item5 = {"id":5,"name":"item5", "desc": "item number 5", "price":5,"amount":5, "image_path": "path/to/image"};
		item_manager.add( item5 );
		expect( item_manager.get_all() ).toEqual( [item5] );
	});

	it('should be able to remove items', function() {
		item_manager.load(item_data);
		item_manager.remove(4);
		expect( item_manager.get_all() ).toEqual([
			{"id":1,"name":"item1", "desc": "item number 1", "price":1,"amount":1, "image_path": "path/to/image"},
			{"id":2,"name":"item2", "desc": "item number 2", "price":2,"amount":2, "image_path": "path/to/image"},
			{"id":3,"name":"item3", "desc": "item number 3", "price":3,"amount":3, "image_path": "path/to/image"},
		]);
	});

	it('should be able to find items', function() {
		item_manager.load(item_data);
		expect( item_manager.find(2) ).toEqual({"id":2,"name":"item2", "desc": "item number 2", "price":2,"amount":2, "image_path": "path/to/image"});
	});
});