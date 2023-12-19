import React, { FC } from 'react';

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
	return (
		<>
			<div className="overflow-scroll h-full">
				<h1>Fixtures</h1>
				{fixturesData?.map((game) => (
					<ul key={game.id}>
						<li className="leading-loose">
							<div className="flex">
								<div>
									{game.date.split('T')[0]}
									:&nbsp;
								</div>
								<div className="flex flex-col">
									<div>{game.home_team.full_name}</div>
									<div>{game.home_team_score}</div>
								</div>

								<span>&nbsp;Vs&nbsp;</span>
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
