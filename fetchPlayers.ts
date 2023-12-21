import { Player } from "./types";
import * as fs from "fs/promises";

const baseURL = "https://free-nba.p.rapidapi.com";
const perPage = 100;

const fetchAllPlayers = async () => {
    let currentPage = 0;
    const allPlayers: Player[] = [];

    while (true) {
        const headers = new Headers({
            "X-RapidAPI-Key": process.env.NBA_API_KEY_2 as string,
            "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
            "Content-Type": "application/json",
        });
        const url = `${baseURL}/players?page=${currentPage}&per_page=${perPage}`;
        const options = {
            method: "GET",
            headers,
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Failed to fetch data for page ${currentPage}`);
            }

            const result: { data: Player[] } = await response.json();

            if (result.data.length === 0) {
                break;
            }

            const uniquePlayers = result.data.filter(
                (player) =>
                    !allPlayers.some(
                        (existingPlayer) => existingPlayer.id === player.id,
                    ),
            );

            allPlayers.push(...uniquePlayers);
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
        const filePath = "players.json";
        await fs.writeFile(filePath, JSON.stringify(players, null, 2));
        // console.log(`Players data saved to ${filePath}`);
    } catch (error) {
        console.error("Error saving players data:", error);
    }
}

async function main() {
    const players = await fetchAllPlayers();
    await savePlayersToFile(players);
}

main();
