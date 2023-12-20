import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export interface FixturesDataProps {
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
}

const Fixtures: FC<FixturesDataProps> = ({ fixturesData }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (!fixturesData) {
        return <p>Loading...</p>;
    }
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "#fff",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        color: "#fff",
    };
    console.log(fixturesData);
    return (
        <>
            <h1 className="flex items-center justify-center text-xl font-bold p-2 bg-white rounded-lg mt-2">
                Fixtures
            </h1>
            <div className="overflow-auto flex flex-col items-center justify-center">
                {fixturesData?.map((game) => (
                    <ul key={game.id}>
                        <li className="leading-relaxed flex flex-col items-center">
                            <div>
                                {game.date.split("T")[0]}
                                :&nbsp;
                            </div>
                            <div className="flex items-center justify-center w-full text-center">
                                <div className="flex flex-col">
                                    <div>{game.home_team.full_name}</div>
                                    <div>{game.home_team_score}</div>
                                </div>

                                <span>&nbsp;VS&nbsp;</span>
                                <div>
                                    <div>{game.visitor_team.full_name}</div>
                                    <div>{game.visitor_team_score}</div>
                                </div>
                                <div></div>
                            </div>

                            <div>
                                <Button onClick={handleOpen}>Explore</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                        >
                                            {game.home_team.full_name}
                                        </Typography>
                                        <Typography
                                            id="modal-modal-description"
                                            sx={{ mt: 2, flex: "flex-col" }}
                                        >
                                            {/* <div className="block">
                                                Points: {game.home_team_score}
                                            </div>
                                            <div className="block">
                                                Postseason:{" "}
                                                {game.postseason === false
                                                    ? "No"
                                                    : "Yes"}
                                            </div>
                                            <div className="block">
                                                Final:
                                                {game.status === "Final"
                                                    ? "Final"
                                                    : "Season Game"}
                                            </div> */}
                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>
                        </li>
                    </ul>
                ))}
            </div>
        </>
    );
};

export default Fixtures;
