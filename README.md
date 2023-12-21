# NBA Challenge

The NBA Challenge project is a dynamic web application that harnesses the power of the NBA API to provide users with comprehensive information about NBA teams, players, and games. Leveraging the extensive dataset available through the API, the project offers several key features to enhance the user experience:

## Key Features

1. List all Teams
   Explore an exhaustive list of NBA teams, providing users with a comprehensive overview of the league's diverse roster.

2. Show a team roster
   Access detailed team rosters to discover and learn more about each player associated with a specific NBA team.

3. Show the stats of a player of a given team
   Gain insights into the statistical performance of individual players on a chosen NBA team, allowing users to track player achievements and contributions.

4. List all games of a given team
   Navigate through the project to find a complete listing of games played by a selected NBA team, offering a comprehensive view of their season journey.

5. EXTRA: Show the stats from any game of a given team
   For enthusiasts seeking in-depth game analysis, the project goes beyond the basics by providing detailed statistics from specific games involving a chosen NBA team.

## Prerequisites

1. Visit [https://rapidapi.com/](https://rapidapi.com/) and create an account.
2. Visit [https://rapidapi.com/theapiguy/api/free-nba](https://rapidapi.com/theapiguy/api/free-nba) to fetch all relevant data.

## Data Fetching

I recommend fetching all data to make the development seamless.

1. Fetch all games from [https://free-nba.p.rapidapi.com/games?page=0](https://free-nba.p.rapidapi.com/games?page=0)
2. Fetch all stats from [https://free-nba.p.rapidapi.com/stats?page=100&per_page=100](https://free-nba.p.rapidapi.com/stats?page=100&per_page=100)
3. Fetch all teams from [https://free-nba.p.rapidapi.com/teams?page=0](https://free-nba.p.rapidapi.com/teams?page=0)
4. Fetch all players from [https://free-nba.p.rapidapi.com/players?page=0&per_page=100](https://free-nba.p.rapidapi.com/players?page=0&per_page=100)

On the API page, you will find meta data displaying pages, current page, total count, and more. Use these numbers to run a script to fetch all pertinent data.

## Installations

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd nba-challenge
```

### Step 2: Install Dependencies

```
npm install
```

### Step 3: Run the Development Server

```
npm run dev

```

### Step 4: Build the Project

```
npm run build
```

### Step 5: Start the Project

```
npm start
```

### Step 6: Lint the Code

```
npm run lint
```

### Limitations

1. API is broken with no direct endpoints and extensive waiting times, thus you would need to develop your own API either through a backend or through JSON.
2. There is an exorbitant amount of data, thus importing the data into a JSON makes the UX slow and unattractive. This is seen distinctly when importing stats data and games data.
3. Teams data consists of teams that consists of data that is empty. Thus only import data from page 1
4. Stats data as explained is extensive as it imports statisical data for all players.
