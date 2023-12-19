import React, { FC } from 'react';
import Stats from '../stats.json';
import Tooltip from './Tooltip';
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
	const statsPerPlayer = roster?.map((player) => {
		const playerData = Stats.filter((stat) => stat.player.id === player.id);
		return { ...player, stats: playerData };
	});

	// console.log(statsPerPlayer[0].stats);

	const calculateAveragePts = (ptsArray) => {
		if (ptsArray.length === 0) {
			return 0;
		}
		const totalPts = ptsArray.reduce((sum, stat) => sum + (stat.pts || 0), 0);
		return totalPts / ptsArray.length;
	};
	const calculateAverageAssists = (astArray) => {
		if (astArray.length === 0) {
			return 0;
		}
		const totalAssists = astArray.reduce(
			(sum, stat) => sum + (stat.ast || 0),
			0
		);
		return totalAssists / astArray.length;
	};
	const calculateAverageBlocks = (blkArray) => {
		if (blkArray.length === 0) {
			return 0;
		}
		const totalBlock = blkArray.reduce((sum, stat) => sum + (stat.blk || 0), 0);
		return totalBlock / blkArray.length;
	};
	const calculateAverageSteals = (stlArray) => {
		if (stlArray.length === 0) {
			return 0;
		}
		const totalSteals = stlArray.reduce(
			(sum, stat) => sum + (stat.stl || 0),
			0
		);
		return totalSteals / stlArray.length;
	};

	return (
		<>
			<div className="grid cols-span-2">
				<table className="table-auto">
					<thead>
						<tr>
							<th className="text-left">Roster</th>
							<th className="text-left">Team</th>
							<th className="text-left">Avg.Points</th>
							<th className="text-left">Assists</th>
							<th className="text-left">Rebounds</th>
							<th className="text-left">Steals</th>
						</tr>
					</thead>
					<tbody>
						{statsPerPlayer.map((player) => (
							<tr key={player.id}>
								<td>{player.first_name}</td>
								<td>{player.team.city}</td>
								<td>{calculateAveragePts(player.stats).toFixed(2)}</td>
								<td>{calculateAverageAssists(player.stats).toFixed(2)}</td>
								<td>{calculateAverageBlocks(player.stats).toFixed(2)}</td>
								<td>{calculateAverageSteals(player.stats).toFixed(2)}</td>
							</tr>
						))}
					</tbody>{' '}
				</table>
			</div>
		</>
	);
};

export default Roster;
