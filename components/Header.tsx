import React, { FC } from 'react';
import Head from 'next/head';

const Header: FC = () => {
	return (
		<Head>
			<title>NBA Stats Explorer</title>
			<meta
				name="description"
				content="Explore NBA team information, player stats, and game details with this React-based Single Page Application. Get insights into teams, rosters, player statistics, and more using the free NBA API."
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
	);
};

export default Header;
