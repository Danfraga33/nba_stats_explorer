import React, { FC } from "react";
import Stats from "../stats.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export interface RosterPlayer {
    roster: {
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
    };
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
    const statsPerPlayer = roster?.map((player: Player) => {
        const playerData = Stats.filter(
            (stat: Player) => stat.player.id === player.id,
        );
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

    return (
        <>
            <div className="grid cols-span-2">
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Roster</TableCell>

                                    <TableCell align="right">Team</TableCell>
                                    <TableCell align="right">
                                        Avg.Points
                                    </TableCell>
                                    <TableCell align="right">
                                        Avg.Assists
                                    </TableCell>
                                    <TableCell align="right">
                                        Avg.Blocks
                                    </TableCell>
                                    <TableCell align="right">
                                        Avg.Rebounds
                                    </TableCell>
                                    <TableCell align="right">
                                        Avg.Steals
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {statsPerPlayer?.map((player) => (
                                <TableBody key={player.id}>
                                    <TableRow
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {player?.first_name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {player?.team.city}
                                        </TableCell>
                                        <TableCell align="right">
                                            {calculateAveragePts(
                                                player?.stats,
                                            ).toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {calculateAverageAssists(
                                                player?.stats,
                                            ).toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {calculateAverageBlocks(
                                                player?.stats,
                                            ).toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {calculateAverageBlocks(
                                                player?.stats,
                                            ).toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {calculateAverageSteals(
                                                player?.stats,
                                            ).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                        </Table>
                    </TableContainer>
                </>
            </div>
        </>
    );
};

export default Roster;
