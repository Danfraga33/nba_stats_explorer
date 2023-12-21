import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import { ReactElement } from "react";
import Layout from "@/Layout";
import { NextPageWithLayout } from "./_app";
import type { Team } from "@/types";

interface MainPageProps {
    nbaTeams: Team[];
}

export const getStaticProps = async () => {
    const headers = new Headers({
        "X-RapidAPI-Key": process.env.NBA_API_KEY_2 as string,
        "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
        "Content-Type": "application/json",
    });
    const response = await fetch("https://free-nba.p.rapidapi.com/teams", {
        headers,
    });

    const data: { data: Team[] } = await response.json();

    return {
        props: { nbaTeams: data.data },
    };
};

const Home: NextPageWithLayout<MainPageProps> = ({ nbaTeams }) => {
    if (!nbaTeams) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="px-8 py-1">
                <Header />
                <MainContent teams={nbaTeams} />
            </div>
        </>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <div>
            <Layout>{page}</Layout>
        </div>
    );
};

export default Home;
