import Layout from "@/Layout";
import type { GetStaticProps } from "next";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import players from "../../players.json";
import fixtures from "../../games.json";
import type { GetStaticPaths } from "next";
import TeamInfo from "@/components/TeamInfo";
import type { Team, Game, Player, PlayerWithTeam } from "@/types";

export const getStaticPaths: GetStaticPaths = (async () => {
    const headers = new Headers({
        "X-RapidAPI-Key": process.env.NBA_API_KEY_2 as string,
        "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
        "Content-Type": "application/json",
    });
    const response = await fetch("https://free-nba.p.rapidapi.com/teams", {
        headers,
    });
    const result = await response.json();

    if (!result) {
        console.log("NO DATA");
    }
    const nbaTeamsData: Team[] = result.data;

    const paths = nbaTeamsData.map((team) => ({
        params: {
            id: team.id.toString(),
        },
    }));

    return {
        fallback: false,
        paths,
    };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const teamId = context?.params?.id;

        if (!teamId || typeof teamId === "object") {
            throw new Error("Failed to fetch team id");
        }

        const headers = new Headers({
            "X-RapidAPI-Key": process.env.NBA_API_KEY_2 as string,
            "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
            "Content-Type": "application/json",
        });
        const baseURL = "https://free-nba.p.rapidapi.com";
        const teamData = await fetch(`${baseURL}/teams/${teamId}`, {
            headers,
        });

        if (!teamData.ok) {
            throw new Error("Failed to fetch team data");
        }

        const team: Team = await teamData.json();

        const roster = players.filter((player) => player.team.id === team.id);

        const fixtureData = fixtures.filter(
            (game) => game.home_team.id === team.id,
        );

        return {
            props: {
                team,
                fixtureData,
                roster,
            },
        };
        revalidate: 60;
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export interface DynamicData {
    team: Team;
    fixtureData: Game[];
    roster: PlayerWithTeam[];
}

const Team: NextPageWithLayout<DynamicData> = ({
    team,
    fixtureData,
    roster,
}) => {
    if (!team) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <TeamInfo team={team} roster={roster} fixturesData={fixtureData} />
        </>
    );
};

Team.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <Layout>{page}</Layout>
        </>
    );
};

export default Team;
