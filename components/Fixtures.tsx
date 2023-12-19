import React, { FC } from 'react';
import gameData from '../games.json';
export interface FixturesDataProps {
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
}

const Fixtures: FC<FixturesDataProps> = ({ fixturesData }) => {
	if (!fixturesData) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<h1 className="flex items-center justify-center text-xl font-bold p-2 bg-white rounded-lg mt-2">
				Fixtures
			</h1>
			<div className="overflow-auto flex flex-col items-center justify-center">
				{fixturesData?.map((game) => (
					<ul key={game.id}>
						<li className="leading-relaxed flex flex-col items-center">
							<div>
								{game.date.split('T')[0]}
								:&nbsp;
							</div>
							<div className="flex items-center justify-center w-full text-center">
								<div className="flex flex-col">
									<div>{game.home_team.full_name}</div>
									<div>{game.home_team_score}</div>
								</div>

								<span>&nbsp;VS&nbsp;</span>
								<div>
									<div>{game.visitor_team.full_name}</div>
									<div>{game.visitor_team_score}</div>
								</div>
							</div>
						</li>
					</ul>
				))}
			</div>
		</>
	);
};

export default Fixtures;
