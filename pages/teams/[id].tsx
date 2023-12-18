import Layout from '@/Layout';
import type { GetStaticProps } from 'next';
import { ReactElement } from 'react';

import type {
	InferGetStaticPropsType,
	GetStaticProps,
	GetStaticPaths,
} from 'next';

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

		console.log('🆔🆔:', teamId);

		const res = await fetch(`https://free-nba.p.rapidapi.com/teams/${teamId}`, {
			headers: {
				'X-RapidAPI-Key': process.env.NBA_API_KEY_2,
				'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			throw new Error('Failed to fetch team data');
		}
		const team = await res.json();
		console.log('END💪💪:', team);

		return {
			props: {
				team,
			},
		};
	} catch (error) {
		// console.error('Error fetching team data:', error.message);
		return {
			notFound: true,
		};
	}
};

const Team = ({ team }) => {
	if (!team) {
		return <p>Loading...</p>;
	}

	return <h1>Team Name</h1>;
};

export default Team;
