import Link from 'next/link';
import React, { FC } from 'react';

const Navigation: FC = () => {
	return (
		<header className="container px-2 flex items-center justify-between shadow-md md:shadow-none h-20 bg-red-500">
			<div className="text-2xl">NBA Stats Explorer</div>
			<nav>
				<ul className="hidden md:flex items-center space-x-3 lg:space-x-8 ">
					<li>
						<Link href="/">All Teams</Link>
					</li>
					<li>
						<Link href="/new-meetup">Team Rosters</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navigation;
