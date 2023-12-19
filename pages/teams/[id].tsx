import Layout from '@/Layout';
import type { GetStaticProps, NextPage } from 'next';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

import type {
	InferGetStaticPropsType,
	GetStaticProps,
	GetStaticPaths,
} from 'next';
import { revalidateTag } from 'next/cache';

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
		// console.log('END💪💪:', team);

		return {
			props: {
				team,
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
}

const Team: NextPageWithLayout<DynamicData> = ({ team, rosterData }) => {
	if (!team) {
		return <p>Loading...</p>;
	}

	return (
		<div className="container mt-4 justify-evenly items-center bg-blue-500 px-4 h-screen">
			<h1 className="text-2xl">Team Name: {team.name}</h1>
			<p className="text-md">Full Name:{team.full_name}</p>
			<p className="text-md">Abbreviation: {team.abbreviation}</p>
			<p className="text-md">City: {team.city}</p>
			<p className="text-md">Conference:{team.conference}</p>
			<p className="text-md">Divison:{team.division}</p>
		</div>
	);
};

Team.getLayout = function getLayout(page: ReactElement) {
	return (
		<div>
			<Layout>{page}</Layout>
		</div>
	);
};

export default Team;
