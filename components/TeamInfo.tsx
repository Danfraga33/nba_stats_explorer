import React, { FC } from "react";
import Roster from "./Roster";
import TeamData from "./TeamData";
import Fixtures from "./Fixtures";

export interface TeamInfoProps {
    team?: {
        id: number;
        abbreviation: string;
        city: string;
        conference: string;
        division: string;
        full_name: string;
        name: string;
    };

    fixturesData?: {
        id: number;
        date: Date;
        home_team: object;
        home_team_score: number;
        period: number;
        postseason: boolean;
        season: number;
        status: string;
        time: string;
        visitor_team: object;
        visitor_team_score: number;
    };

    roster?: {
        id: number;
        first_name: string;
        height_feet: null;
        height_inches: null;
        last_name: string;
        position: string;
        team: object;
        weight_pounds: null;
    };
}
const TeamInfo: FC<TeamInfoProps> = ({ team, roster, fixturesData }) => {
    console.log(roster);
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-0 h-screen container mt-4 bg-blue-500 px-4">
            <div className="col-span-2 row-span-1">
                <TeamData team={team} />
            </div>
            <div className="col-span-2 overflow-auto row-span-1">
                <Fixtures fixturesData={fixturesData} />
            </div>
            <div className="col-span-4 row-span-2 overflow-auto">
                <Roster roster={roster} />
            </div>
        </div>
    );
};

export default TeamInfo;
