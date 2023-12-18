import React, { FC } from 'react';
import Link from 'next/link';
export interface MainContentProps {
	teams: Array<{
		id: number;
		abbreviation: string;
		city: string;
		conference: string;
		division: string;
		full_name: string;
		name: string;
	}>;
}

const MainContent: FC<MainContentProps> = ({ teams }) => {
	return (
		<main className="container mt-4 justify-evenly items-center bg-blue-500 px-4 h-screen">
			<h1 className="pb-5 w-full flex items-center justify-center">
				NBA TEAMS
			</h1>

			<div className="flex justify-evenly">
				<div className="west">
					<h2 className="text-2xl flex container justify-end font-bold">
						West
					</h2>
					{teams?.map(
						(team) =>
							team.conference === 'West' && (
								<ul key={team.id} className="leading-loose flex justify-end">
									<li>
										<Link href={`/teams/${team.id}`}>{team.name}</Link>
									</li>
								</ul>
							)
					)}
				</div>
				<div className="east">
					<h2 className="text-2xl flex container  font-bold">East</h2>

					{teams?.map(
						(team) =>
							team.conference === 'East' && (
								<ul key={team.id} className="leading-loose justify-end">
									<li>{team.name}</li>
								</ul>
							)
					)}
				</div>
			</div>
		</main>
	);
};

export default MainContent;
