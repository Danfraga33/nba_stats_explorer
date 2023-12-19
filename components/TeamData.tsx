import React, { FC } from 'react';
import players from '../players.json';

export interface TeamDataProps {
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

console.log(players.length);

const TeamData: FC<TeamDataProps> = ({ team }) => {
	return (
		<div>
			<h1 className="flex items-center justify-center">Team Information</h1>
			<h1 className="text-2xl">Team Name: {team?.name}</h1>
			<p className="text-md">Full Name:{team?.full_name}</p>
			<p className="text-md">Abbreviation: {team?.abbreviation}</p>
			<p className="text-md">City: {team?.city}</p>
			<p className="text-md">Conference:{team?.conference}</p>
			<p className="text-md">Divison:{team?.division}</p>
		</div>
	);
};

export default TeamData;
