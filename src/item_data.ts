import fs from 'fs';
import { DatabaseSync } from 'node:sqlite';
import { Item } from "./item.js"

export class ItemData {
	static db = new DatabaseSync('data/item_data.db')
	static data_location: string = "./data/item_data.json"

	static read(): Item[] {
		// ItemData.db.exec(`CREATE TABLE IF NOT EXISTS item_data (
		// 	id INTEGER PRIMARY KEY AUTOINCREMENT,
		// 	name TEXT NOT NULL,
		// 	desc TEXT NOT NULL,
		// 	image_path TEXT NOT NULL,
		// 	price FLOAT NOT NULL,
		// 	amount INTEGER NOT NULL
		// )`)

		try {
			// let data2 = fs.readFileSync(ItemData.data_location, 'utf8');
			// console.log('Success reading JSON file for Item Data');

			const data = ItemData.db.prepare(`SELECT * FROM item_data`);
			console.log('Success reading DB file for Item Data');
			return JSON.parse(JSON.stringify(data.all()))
		} catch (error) {
			console.error('Error reading DB file:', error);
		}
		return []
		
	}

	static write(data: Item[]): void {
		try {
			//fs.writeFileSync(ItemData.data_location, JSON.stringify(data), 'utf8');
			//console.log('Success writing JSON file for Item Data');

			ItemData.db.exec('DELETE FROM item_data')
			ItemData.db.exec('VACUUM')
			for (const item of data) {
				ItemData.db.exec(`INSERT INTO item_data (id, name, desc, image_path, price, amount) VALUES (${item.id}, '${item.name}', '${item.desc}', '${item.image_path}', ${item.price}, ${item.amount})`);	
			}
			console.log('Success writing DB file for Item Data');

		} catch (error) {
			console.error('Error writing DB file:', error);
		}
	}
}

