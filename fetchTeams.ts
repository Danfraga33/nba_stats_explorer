import * as fs from "fs/promises";
import type { Team } from "./types";

const baseURL = "https://free-nba.p.rapidapi.com";
const perPage = 25;

export interface TeamsResponse {
    data: Team[];
}

const fetchAllTeams = async () => {
    let currentPage = 0;
    const pages = 2;
    const allTeams: Team[] = [];

    while (currentPage < pages) {
        const headers = new Headers({
            "X-RapidAPI-Key": process.env.NBA_API_KEY_2 as string,
            "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
            "Content-Type": "application/json",
        });
        // const url = `https://free-nba.p.rapidapi.com/teams?page=0`;
        const url = `${baseURL}/teams?page=${currentPage}&per_page=${perPage}`;
        const options = {
            method: "GET",
            headers,
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Failed to fetch data for page ${currentPage}`);
            }

            const result: TeamsResponse = await response.json();

            if (result.data.length === 0) {
                // No more data, break the loop
                break;
            }

            const uniqueTeams = result.data.filter(
                (team) =>
                    !allTeams.some(
                        (exisitingTeam) => exisitingTeam.id === team.id,
                    ),
            );

            allTeams.push(...uniqueTeams);
            currentPage++;
        } catch (error) {
            console.error(error);
            break;
        }
    }

    return allTeams;
};

async function saveTeamsToFile(teams: any[]) {
    try {
        const filePath = "teams.json";
        await fs.writeFile(filePath, JSON.stringify(teams, null, 2));
        // console.log(`Stats data saved to ${filePath}`);
    } catch (error) {
        console.error("Error saving Teams data:", error);
    }
}

async function main() {
    const teams = await fetchAllTeams();
    await saveTeamsToFile(teams);
}

main();
