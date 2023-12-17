// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	name: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const url = 'https://free-nba.p.rapidapi.com/teams';
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'f50a47a7ddmsh482e257a603d514p106077jsn56e5e9623fd3',
			'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
		},
	};
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);
		res.status(200).json(result);
	} catch (err: any) {
		console.error('Error', err.message);
		res.status(500).json({ err: 'Internal Server Error' });
	}
}
