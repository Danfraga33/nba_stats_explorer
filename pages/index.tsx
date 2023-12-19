import Header from '@/components/Header';
import MainContent from '@/components/MainContent';
import { ReactElement } from 'react';
import Layout from '@/Layout';
import { NextPageWithLayout } from './_app';

export const getStaticProps = async () => {
	const response = await fetch('https://free-nba.p.rapidapi.com/teams', {
		headers: {
			'X-RapidAPI-Key': process.env.NBA_API_KEY_2,
			'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();

	return {
		props: { nbaTeams: data },
	};
};

const Home: NextPageWithLayout = ({ nbaTeams }) => {
	// TYPE NEEDED - TEAMS OBJECTS
	const teams = nbaTeams.data;
	// useEffect(() => {
	// 	async function basketballPlayers() {
	// 		try {
	// 			// Data
	// 			const response = await fetch('api/teams');
	// 			if (!response.ok) {
	// 				throw new Error('Failed to fetch data');
	// 			}
	// 			// Parse JSON response
	// 			const result = await response.json();

	// 			const nbaTeamsData = result.data;

	// 			setTeams(nbaTeamsData);
	// 		} catch (err: any) {
	// 			console.error('Error', err.message);
	// 		}
	// 	}
	// 	basketballPlayers();
	// }, []);

	if (!teams) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<div className="px-10 py-1">
				<Header />
				<MainContent teams={teams} />
			</div>
		</>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<div>
			<Layout>{page}</Layout>
		</div>
	);
};

export default Home;
