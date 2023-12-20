import Layout from '@/Layout';
import type { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import players from '../../players.json';
import fixtures from '../../games.json';
import type { GetStaticPaths } from 'next';
import TeamInfo from '@/components/TeamInfo';

export const getStaticPaths = (async () => {
	const response = await fetch('https://free-nba.p.rapidapi.com/teams', {
		headers: {
			'X-RapidAPI-Key': process.env.NBA_API_KEY_2,
			'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();

	if (!result) {
		console.log('NO DATA');
	}
	const nbaTeamsData = result.data;

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
		// console.log('🆔🆔:', teamId);
		const baseURL = 'https://free-nba.p.rapidapi.com';
		const headers = {
			'X-RapidAPI-Key': process.env.NBA_API_KEY_2,
			'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
			'Content-Type': 'application/json',
		};
		const teamData = await fetch(`${baseURL}/teams/${teamId}`, {
			headers,
		});

		if (!teamData.ok) {
			throw new Error('Failed to fetch team data');
		}
		const team = await teamData.json();
		// console.log('🔥🔥🔥TEAM:', team);

		const roster = players.filter((player) => {
			if (player.team.id === team.id) {
				return player;
			}
		});
		// console.log('🤼🤼🤼ROSTER:', roster);

		const fixtureData = fixtures.filter((game) => {
			if (game?.home_team?.id === +teamId) {
				return game;
			}
		});

		console.log('🚀🚀🚀FixtureData:', fixtures[0]);

		return {
			props: {
				team,
				fixtureData,
				roster,
			},
		};
		revalidate: 60;
	} catch (error) {
		// console.error('Error fetching team data:', error.message);
		return {
			notFound: true,
		};
	}
};

export interface DynamicData {
	team?: {
		id: number;
		abbreviation: string;
		city: string;
		conference: string;
		division: string;
		full_name: string;
		name: string;
	};

	fixturesData?: {
		id: number;
		date: Date;
		home_team: {};
		home_team_score: number;
		period: number;
		postseason: boolean;
		season: number;
		status: string;
		time: string;
		visitor_team: {};
		visitor_team_score: number;
	};

	roster?: {
		id: number;
		first_name: string;
		height_feet: null;
		height_inches: null;
		last_name: string;
		position: string;
		team: {};
		weight_pounds: null;
	};
}

const Team: NextPageWithLayout<DynamicData> = ({
	team,
	fixtureData,
	roster,
}) => {
	if (!team) {
		return <p>Loading...</p>;
	}
	console.log(fixtureData);
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
