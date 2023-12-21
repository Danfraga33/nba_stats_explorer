import React, { FC } from "react";
import West from "./West";
import East from "./East";
import type { Team } from "@/types";

export interface MainContentProps {
    teams: Team[];
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
