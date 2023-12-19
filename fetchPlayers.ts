import * as fs from 'fs/promises';

const baseURL = 'https://free-nba.p.rapidapi.com';
const perPage = 100;

async function fetchAllPlayers() {
	let currentPage = 1;
	let totalPages = 20;

	const allPlayers = [];

	while (currentPage <= totalPages) {
		const url = `https://free-nba.p.rapidapi.com/players?page=${currentPage}per_page=${perPage}`;

		const options: RequestInit = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': process.env.NBA_API_KEY as string,
				'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
			},
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.error(`Failed to fetch players. Status: ${response.status}`);
				const errorBody = await response.text();
				console.error(`Error Body: ${errorBody}`);
				throw new Error('Failed to fetch players');
			}
			const result = await response.json();
			console.log(result);

			allPlayers.push(...result.data);

			currentPage = result.meta.current_page + 1;
			totalPages = result.meta.total_pages;
		} catch (error) {
			console.error(error);
			// break; // Exit the loop in case of an error
		}
	}

	return allPlayers;
}

async function savePlayersToFile(players: any[]) {
	try {
		const filePath = 'players.json';
		await fs.writeFile(filePath, JSON.stringify(players, null, 2));
		console.log(`Players data saved to ${filePath}`);
	} catch (error) {
		console.error('Error saving players data:', error);
	}
}

async function main() {
	const players = await fetchAllPlayers();
	await savePlayersToFile(players);
}

main();
