import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`http://localhost:1323/stories/${params.slug}`);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const story = await res.json()

	return { story };
};
