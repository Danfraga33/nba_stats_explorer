import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import React, { FC } from 'react';

const Navigation: FC = () => {
	return (
		<header className="container px-2 flex items-center justify-between shadow-md md:shadow-none h-20 bg-red-500">
			<FontAwesomeIcon icon={faBasketballBall} className="text-4xl pr-2" />
			<div className="hidden md:block text-2xl">NBA Stats Explorer</div>

			<nav className="w-full justify-evenly md:justify-end flex">
				<ul className=" items-center space-x-3 lg:space-x-8 flex ">
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
