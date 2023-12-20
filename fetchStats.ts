import * as fs from 'fs/promises';

const baseURL = 'https://free-nba.p.rapidapi.com';
const perPage = 100;

const fetchAllStats = async () => {
	let currentPage = 0;
	const pages = 15634;
	const allStats: string[] = [];

	while (currentPage < pages) {
		const url = `${baseURL}/stats?page=${currentPage}&per_page=${perPage}`;
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': process.env.NBA_API_KEY_2 as string,
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

			const uniqueStats = result.data.filter(
				(stat) => !allStats.some((existingStat) => existingStat.id === stat.id)
			);

			allStats.push(...uniqueStats);
			currentPage++;
		} catch (error) {
			console.error(error);
			break;
		}
	}

	return allStats;
};

async function saveStatsToFile(stats: any[]) {
	try {
		const filePath = 'stats.json';
		await fs.writeFile(filePath, JSON.stringify(stats, null, 2));
		// console.log(`Stats data saved to ${filePath}`);
	} catch (error) {
		console.error('Error saving Stats data:', error);
	}
}

async function main() {
	const stats = await fetchAllStats();
	await saveStatsToFile(stats);
}

main();
