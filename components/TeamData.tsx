import React, { FC } from 'react';

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

const TeamData: FC<TeamDataProps> = ({ team }) => {
	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="flex items-center justify-center text-2xl font-bold p-2 bg-white rounded-lg mt-2">
				Team Information
			</h1>
			<h1 className="text-xl ">Team Name: {team?.name}</h1>
			<ul className="text-md items-center flex flex-col leading-loose">
				<li className="text-lg">Full Name:{team?.full_name}</li>
				<li className="text-lg">Abbreviation: {team?.abbreviation}</li>
				<li className="text-lg">City: {team?.city}</li>
				<li className="text-lg">Conference:{team?.conference}</li>
				<li className="text-lg">Divison:{team?.division}</li>
			</ul>
			<p className="text-md"></p>
			<p className="text-md"></p>
			<p className="text-md"></p>
			<p className="text-md"></p>
			<p className="text-md"></p>
		</div>
	);
};

export default TeamData;
