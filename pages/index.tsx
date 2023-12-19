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
	const teams = nbaTeams.data;

	if (!teams) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<div className="px-8 py-1">
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
