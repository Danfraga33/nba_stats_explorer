import React, { useState } from 'react';

const Tooltip = ({ children, content }) => {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<div className="relative inline-block">
			<button
				type="button"
				className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 m-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
			>
				{children}
			</button>

			<div className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				{content}
				<div className="tooltip-arrow" data-popper-arrow></div>
			</div>
		</div>
	);
};

export default Tooltip;
