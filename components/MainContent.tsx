import React, { FC } from "react";
import Link from "next/link";
import West from "./West";
import East from "./East";
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
        <main
            className="
		container mt-4 justify-evenly items-center bg-blue-500 px-4 h-screen"
        >
            <h1 className="pb-5 w-full flex items-center justify-center">
                NBA TEAMS
            </h1>

            <div className="flex justify-evenly">
                <West teams={teams} />
                <East teams={teams} />
            </div>
        </main>
    );
};

export default MainContent;
