import React, { FC } from "react";
import Stats from "../stats.json";

export interface RosterPlayer {
    id: number;
    first_name: string;
    height_feet: null;
    height_inches: null;
    last_name: string;
    position: string;
    team: {
        city: string;
    };
    weight_pounds: null;
}
[];

export interface Team {
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    id: number;
    name: string;
}

export interface PlayerClass {
    first_name: string;
    height_feet: null;
    height_inches: null;
    id: number;
    last_name: string;
    position: string;
    team_id: number;
    weight_pounds: null;
}
export interface Game {
    date: Date;
    home_team_id: number;
    home_team_score: number;
    id: number;
    period: number;
    postseason: boolean;
    season: number;
    status: string;
    time: string;
    visitor_team_id: number;
    visitor_team_score: number;
}
export interface Player {
    game: Game;
    id: number;
    min: string;
    oreb: number;
    pf: number;
    player: PlayerClass;
    pts: number;
    reb: number;
    ast: number;
    stl: number;
    team: Team;
    blk: number;
    turnover: number;
}
export interface Team {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
}

export interface Player {
    roster?: {
        first_name: string;
        height_feet: null;
        height_inches: null;
        id: number;
        last_name: string;
        position: string;
        team: Team;
        weight_pounds: null;
    }[];
}

const Roster: FC<Player> = ({ roster }) => {
    console.log(roster);

    const statsPerPlayer = roster?.map((player: Object) => {
        const playerData = Stats.filter((stat) => stat.player.id === player.id);
        return { ...player, stats: playerData };
    });

    const calculateAveragePts = (ptsArray: Player[]) => {
        if (ptsArray.length === 0) {
            return 0;
        }
        const totalPts = ptsArray.reduce(
            (sum, stat) => sum + (stat.pts || 0),
            0,
        );
        return totalPts / ptsArray.length;
    };
    const calculateAverageAssists = (astArray: Player[]) => {
        if (astArray.length === 0) {
            return 0;
        }
        const totalAssists = astArray.reduce(
            (sum, stat) => sum + (stat.ast || 0),
            0,
        );
        return totalAssists / astArray.length;
    };
    const calculateAverageBlocks = (blkArray: Player[]) => {
        if (blkArray.length === 0) {
            return 0;
        }
        const totalBlock = blkArray.reduce(
            (sum, stat) => sum + (stat.blk || 0),
            0,
        );
        return totalBlock / blkArray.length;
    };
    const calculateAverageSteals = (stlArray: Player[]) => {
        if (stlArray.length === 0) {
            return 0;
        }
        const totalSteal = stlArray.reduce(
            (sum, stat) => sum + (stat.stl || 0),
            0,
        );
        return totalSteal / stlArray.length;
    };
    console.log(statsPerPlayer);
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
                        {statsPerPlayer?.map((player) => (
                            <tr key={player?.id}>
                                <td>{player?.first_name}</td>
                                <td>{player?.team.city}</td>
                                <td>
                                    {calculateAveragePts(player?.stats).toFixed(
                                        2,
                                    )}
                                </td>
                                <td>
                                    {calculateAverageAssists(
                                        player?.stats,
                                    ).toFixed(2)}
                                </td>
                                <td>
                                    {calculateAverageBlocks(
                                        player?.stats,
                                    ).toFixed(2)}
                                </td>
                                <td>
                                    {calculateAverageSteals(
                                        player?.stats,
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>{" "}
                </table>
            </div>
        </>
    );
};

export default Roster;
