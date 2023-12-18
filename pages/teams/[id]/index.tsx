import Layout from '@/Layout';
import type {
	InferGetStaticPropsType,
	GetStaticProps,
	GetStaticPaths,
} from 'next';
import React, { FC, ReactElement } from 'react';

export async function getStaticPaths() {
	const response = await fetch('https://free-nba.p.rapidapi.com/teams');
	const result = await response.json();
	console.log('YAY!:', result);
	if (!result || !result.data || !Array.isArray(result.data)) {
		// Handle the case when the data or data array is missing
		console.error('Error: Data or data array is missing in the API response');

		return {
			fallback: false,
			paths: [],
		};
	}

	const paths = result.data.map((team) => ({
		params: { id: team.id.toString() },
	}));

	return {
		fallback: false,
		paths,
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	try {
		const teamId = context?.params?.id;

		console.log('HEELLOO:', teamId);

		const res = await fetch(`https://free-nba.p.rapidapi.com/teams/${teamId}`);
		if (!res.ok) {
			throw new Error('Failed to fetch team data');
		}
		const team = await res.json();
		const nbaTeams = team.data;

		return {
			props: {
				nbaTeams,
			},
		};
	} catch (error) {
		console.error('Error fetching team data:', error.message);
		return {
			notFound: true,
		};
	}
};

const Team = (nbaTeams) => {
	// if (!nbaTeams) {
	// 	// Handle the case when data is not available
	// 	return <p>Loading...</p>;
	// }

	return <h1>Team Name</h1>;
};

Team.getLayout = function getLayout(page: ReactElement) {
	return (
		<div>
			<Layout>{page}</Layout>
		</div>
	);
};

export default Team;
