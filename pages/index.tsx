import Header from '@/components/Header';
import MainContent from '@/components/MainContent';
import Navigation from '@/components/Navigation';
import { NextPage } from 'next';
import React, { useState, useEffect, ReactElement } from 'react';
import Layout from '@/Layout';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
	const [teams, setTeams] = useState();
	useEffect(() => {
		async function basketballPlayers() {
			try {
				// Data
				const response = await fetch('api/teams');
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				// Parse JSON response
				const result = await response.json();
				const nbaTeamsData = result.data;
				setTeams(nbaTeamsData);
				// console.log(nbaTeamsData);
			} catch (err: any) {
				console.error('Error', err.message);
			}
		}
		basketballPlayers();
	}, []);

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
