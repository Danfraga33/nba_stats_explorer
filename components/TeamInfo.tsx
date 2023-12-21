import React, { FC } from "react";
import Roster from "./Roster";
import TeamData from "./TeamData";
import Fixtures from "./Fixtures";
import type { Team, Game, PlayerWithTeam } from "@/types";

export interface TeamInfoProps {
    team: Team;
    fixturesData: Game[];
    roster: PlayerWithTeam[];
}
const TeamInfo: FC<TeamInfoProps> = ({ team, roster, fixturesData }) => {
    return (
        <div className="flex flex-col py-2 md:grid md:grid-cols-4 md:grid-rows-2 md:gap-0 h-screen container mt-4 bg-blue-500 px-4">
            <div className="col-span-2 row-span-1">
                <TeamData team={team} />
            </div>
            <div className="md:col-span-2 overflow-auto md:row-span-1">
                <Fixtures fixturesData={fixturesData} />
            </div>
            <div className="py-2 hidden md:grid md:col-span-4 md:row-span-2 overflow-auto">
                <Roster roster={roster} />
            </div>
        </div>
    );
};

export default TeamInfo;
