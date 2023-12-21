export interface Game {
    id: number;
    date: string;
    home_team: Team;
    home_team_score: number;
    period: number;
    postseason: boolean;
    season: number;
    status: string;
    time: string;
    visitor_team: Team;
    visitor_team_score: number;
}

export interface Player {
    id: number;
    first_name: string;
    height_feet: number | null;
    height_inches: number | null;
    last_name: string;
    position: string;
    team_id: number;
    weight_pounds: number | null;
}

export interface PlayerWithTeam extends Player {
    team: Team;
    team_id: never;
}

export interface Team {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
}

export interface Stats {
    id: number;
    ast: number | null;
    blk: number | null;
    dreb: number;
    fg3_pct: number;
    fg3a: number;
    fg3m: number;
    fg_pct: number;
    fga: number;
    fgm: number;
    ft_pct: number;
    fta: number;
    ftm: number;
    game: Game;
    min: string;
    oreb: number;
    pf: number;
    player: Player;
    pts: number | null;
    reb: number | null;
    stl: number | null;
    team: Team;
    turnover: number;
}
