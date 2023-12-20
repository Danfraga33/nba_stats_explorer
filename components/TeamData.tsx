import React, { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
export interface TeamDataProps {
    team?: {
        id: number;
        abbreviation: string;
        city: string;
        conference: string;
        division: string;
        full_name: string;
        name: string;
    };
}

const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
};

const TeamData: FC<TeamDataProps> = ({ team }) => {
    return (
        <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItem button>
                <ListItemText primary={team?.name} />
            </ListItem>
            <Divider />
            <ListItem button divider>
                <ListItemText primary={team?.full_name} />
            </ListItem>
            <ListItem button>
                <ListItemText primary={team?.abbreviation} />
            </ListItem>
            <Divider light />
            <ListItem button>
                <ListItemText primary={team?.city} />
            </ListItem>
            <ListItem button>
                <ListItemText primary={team?.conference} />
            </ListItem>
            <ListItem button>
                <ListItemText primary={team?.division} />
            </ListItem>
        </List>
        //   <div className="flex flex-col items-center justify-center">
        //       <h1 className="flex items-center justify-center text-xl font-bold p-2 bg-white rounded-lg mt-2">
        //           Team Information
        //       </h1>
        //       <h1 className="text-xl ">Team Name: {team?.name}</h1>
        //       <ul className="text-md items-center flex flex-col leading-loose">
        //           <li className="text-lg">Full Name:{team?.full_name}</li>
        //           <li className="text-lg">Abbreviation: {team?.abbreviation}</li>
        //           <li className="text-lg">City: {team?.city}</li>
        //           <li className="text-lg">Conference:{team?.conference}</li>
        //           <li className="text-lg">Divison:{team?.division}</li>
        //       </ul>
        //       <p className="text-md"></p>
        //       <p className="text-md"></p>
        //       <p className="text-md"></p>
        //       <p className="text-md"></p>
        //       <p className="text-md"></p>
        //   </div>
    );
};

export default TeamData;
