import fs from 'fs';
import { Item } from "./item.js"

export class ItemData {

	static data_location: string = "./data/item_data.json"

	static read(): Item[] {
		try {
			let data = fs.readFileSync(ItemData.data_location, 'utf8');
			console.log('Success reading JSON file for Item Data');
			return JSON.parse(data)
		} catch (error) {
			console.error('Error reading JSON file:', error);
		}
		return []
		
	}

	static write(data: Item[]): void {
		try {
			fs.writeFileSync(ItemData.data_location, JSON.stringify(data), 'utf8');
			console.log('Success writing JSON file for Item Data');
		} catch (error) {
			console.error('Error writing JSON file:', error);
		}
	}
}


