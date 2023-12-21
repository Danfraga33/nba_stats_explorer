import React, { FC } from "react";
import Link from "next/link";
import type { Team } from "@/types";

export interface WestProps {
    teams: Team[];
}

const East: FC<WestProps> = ({ teams }) => {
    return (
        <div className="east">
            <h2 className="text-2xl flex container  font-bold">East</h2>

            {teams?.map(
                (team) =>
                    team.conference === "East" && (
                        <ul key={team.id} className="leading-loose justify-end">
                            <li className="flex gap-4 items-center">
                                <Link href={`/teams/${team.id}`}>
                                    <button className="px-2 flex justify-center items-center rounded-lg border-2 border-emerald-600 bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600">
                                        <h2 className="text-white">
                                            {team.name}
                                        </h2>
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    ),
            )}
        </div>
    );
};

export default East;
