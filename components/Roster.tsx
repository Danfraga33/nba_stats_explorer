import React, { FC } from 'react';

export interface Roster {
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

// SHOW STATS WITHIN ROSTER
const Roster: FC<Roster> = ({ roster }) => {
	return (
		<div>
			<h1 className="flex justify-center">ROSTER</h1>
			<div className=" h-full">
				{roster?.map((player) => (
					<ul key={player.id}>
						<div className="flex">
							<li>{player.first_name}</li>
							:&nbsp;
							<li>{player.last_name}</li>
						</div>
					</ul>
				))}
			</div>
		</div>
	);
};

export default Roster;
