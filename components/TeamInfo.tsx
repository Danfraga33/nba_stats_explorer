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
}

const TeamInfo: FC<TeamInfoProps> = ({ team }) => {
	return (
		<div className="flex justify-around gap-4 h-screen container mt-4 bg-blue-500 px-4">
			<div className="flex flex-col gap-8">
				<TeamData team={team} />
				<Roster />
			</div>
			<Fixtures />
		</div>
	);
};

export default TeamInfo;
