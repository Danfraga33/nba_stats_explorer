import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { FC, ReactNode, ReactElement } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const App: FC<AppProps> = ({ Component, pageProps }: AppPropsWithLayout) => {
	const getLayout = Component.getLayout ?? ((page) => page);

	return getLayout(<Component {...pageProps} />);
};
export default App;
