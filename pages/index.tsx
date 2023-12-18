import Header from '@/components/Header';
import MainContent from '@/components/MainContent';
import { useState, useEffect, ReactElement } from 'react';
import Layout from '@/Layout';
import { NextPageWithLayout } from './_app';

// export const getStaticProps = async () => {
// 	const response = await fetch('api/teams');
// 	const data = await response.json();
// 	console.log(data);
// 	return {
// 		props: { teams: data },
// 	};
// };

const Home: NextPageWithLayout = () => {
	const [teams, setTeams] = useState(); // TYPE NEEDED - TEAMS OBJECTS

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
