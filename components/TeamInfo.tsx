import React, { FC } from 'react';
import Roster from './Roster';
import TeamData from './TeamData';
import Fixtures from './Fixtures';

export interface TeamInfoProps {
	team?: {
		id: number;
		abbreviation: string;
		city: string;
		conference: string;
		division: string;
		full_name: string;
		name: string;
	};

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

	roster?: {
		id: number;
		first_name: string;
		height_feet: null;
		height_inches: null;
		last_name: string;
		position: string;
		team: {};
		weight_pounds: null;
	};
}

const TeamInfo: FC<TeamInfoProps> = ({ team, roster, fixturesData }) => {
	return (
		<div className="flex justify-around gap-4 h-screen container mt-4 bg-blue-500 px-4">
			<div className="flex flex-col gap-8 ">
				<TeamData team={team} />
				<div className="overflow-scroll">
					<Roster roster={roster} />
				</div>
			</div>
			<Fixtures fixturesData={fixturesData} />
		</div>
	);
};

export default TeamInfo;
