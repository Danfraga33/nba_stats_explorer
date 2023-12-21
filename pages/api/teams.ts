// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const headers = new Headers({
        "X-RapidAPI-Key": process.env.NBA_API_KEY_2 as string,
        "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
        "Content-Type": "application/json",
    });
    const url = "https://free-nba.p.rapidapi.com/teams";
    const options: Object = {
        method: "GET",
        headers,
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        res.status(200).json(result);
    } catch (err) {
        console.error("Error", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
