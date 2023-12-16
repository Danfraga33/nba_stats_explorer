import Header from '@/components/Header';
import MainContent from '@/components/MainContent';
import Navigation from '@/components/Navigation';
import { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<>
			<div className="px-10 py-1">
				<Header />
				<Navigation />
				<MainContent />
			</div>
		</>
	);
};

export default Home;
