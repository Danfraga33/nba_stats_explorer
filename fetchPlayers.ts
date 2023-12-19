import * as fs from 'fs/promises';

const baseURL = 'https://free-nba.p.rapidapi.com';
const perPage = 100;

interface Player {
	id: number;
	first_name: string;
	height_feet: number | null;
	height_inches: number | null;
	last_name: string;
	position: string;
	team: {
		id: number;
		abbreviation: string;
		city: string;
		conference: string;
		division: string;
		full_name: string;
		name: string;
	};
	weight_pounds: number | null;
}

const fetchAllPlayers = async () => {
	let currentPage = 0;
	let allPlayers: Player[] = [];

	while (true) {
		const url = `${baseURL}/players?page=${currentPage}&per_page=${perPage}`;
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'e9fa5c1e9emshbaa329f12260eacp1dad05jsn7872cda1885d',
				'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
			},
		};

		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error(`Failed to fetch data for page ${currentPage}`);
			}

			const result = await response.json();

			if (result.data.length === 0) {
				// No more data, break the loop
				break;
			}

			allPlayers = [...allPlayers, ...result.data];
			currentPage++;
		} catch (error) {
			console.error(error);
			break;
		}
	}

	return allPlayers;
};

async function savePlayersToFile(players: any[]) {
	try {
		const filePath = 'players.json';
		await fs.writeFile(filePath, JSON.stringify(players, null, 2));
		// console.log(`Players data saved to ${filePath}`);
	} catch (error) {
		console.error('Error saving players data:', error);
	}
}

async function main() {
	const players = await fetchAllPlayers();
	await savePlayersToFile(players);
}

main();
