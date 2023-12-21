import { Game } from "./types";
import * as fs from "fs/promises";

const baseURL = "https://free-nba.p.rapidapi.com";
const perPage = 100;

const fetchAllGames = async () => {
    let currentPage = 0;
    const pages = 10;
    const allGames: Game[] = [];

    while (currentPage < pages) {
        // Modify the loop condition
        const headers = new Headers({
            "X-RapidAPI-Key": process.env.NBA_API_KEY_2 as string,
            "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
            "Content-Type": "application/json",
        });
        const url = `${baseURL}/games?page=${currentPage}&per_page=${perPage}`;
        const options = {
            method: "GET",
            headers,
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

            const uniqueGames = result.data.filter(
                (game: Game) =>
                    !allGames.some(
                        (existingGame) => existingGame.id === game.id,
                    ),
            );

            allGames.push(...uniqueGames);
            currentPage++;
        } catch (error) {
            console.error(error);
            break;
        }
    }

    return allGames;
};

async function saveGamesToFile(games: any[]) {
    try {
        const filePath = "games.json";
        await fs.writeFile(filePath, JSON.stringify(games, null, 2));
    } catch (error) {
        console.error("Error saving games data:", error);
    }
}

async function main() {
    const games = await fetchAllGames();
    await saveGamesToFile(games);
}

main();
