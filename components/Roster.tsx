import React, { FC } from "react";
import statsJson from "../stats.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { Team, PlayerWithTeam, Stats, Player } from "@/types";

const Roster: FC<{ roster: PlayerWithTeam[] }> = ({ roster }) => {
    const typedStatsJson = statsJson as Stats[];
    const statsPerPlayer = roster.map((player) => {
        const playerData = typedStatsJson.filter(
            (stat) => stat.player.id === player.id,
        );
        return { ...player, stats: playerData };
    });

    function calculateAverageStat(stats: Stats[], key: keyof Stats): string {
        let accumulator = 0;
        let length: number;
        if (stats.length > 0) {
            length = stats.length;
        } else {
            length = 1;
        }
        for (const stat of stats) {
            if (typeof stat[key] === "number") {
                accumulator += stat[key] as number;
            }
        }
        return (accumulator / length).toFixed(2);
    }

    const viewModel = statsPerPlayer.map((player) => ({
        id: player.id,
        firstName: player.first_name,
        teamCity: player.team.city,
        averagePoints: calculateAverageStat(player.stats, "pts"),
        averageAssists: calculateAverageStat(player.stats, "ast"),
        averageBlock: calculateAverageStat(player.stats, "blk"),
        averageRebound: calculateAverageStat(player.stats, "reb"),
        averageSteal: calculateAverageStat(player.stats, "stl"),
    }));

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
                            {viewModel?.map((player) => (
                                <TableBody key={player.id}>
                                    <TableRow
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {player.firstName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {player.teamCity}
                                        </TableCell>
                                        <TableCell align="right">
                                            {player.averagePoints}
                                        </TableCell>
                                        <TableCell align="right">
                                            {player.averageAssists}
                                        </TableCell>
                                        <TableCell align="right">
                                            {player.averageBlock}
                                        </TableCell>
                                        <TableCell align="right">
                                            {player.averageRebound}
                                        </TableCell>
                                        <TableCell align="right">
                                            {player.averageSteal}
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
