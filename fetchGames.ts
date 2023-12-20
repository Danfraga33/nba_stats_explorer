import * as fs from "fs/promises";

export interface Game {
    id: number;
    date: Date;
    home_team: Team;
    home_team_score: number;
    period: number;
    postseason: boolean;
    season: number;
    status: string;
    time: string;
    visitor_team: Team;
    visitor_team_score: number;
}

export interface Team {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
}

const baseURL = "https://free-nba.p.rapidapi.com";
const perPage = 100;

const fetchAllGames = async () => {
    let currentPage = 0;
    const pages = 2;
    const allGames: Game[] = [];

    while (currentPage < pages) {
        // Modify the loop condition
        const url = `${baseURL}/games?page=${currentPage}&per_page=${perPage}`;
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": process.env.NBA_API_KEY_2 as string,
                "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
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
