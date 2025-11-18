import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	// TODO: Add reqest to /stories to check that params.slug actually exists
	// before allowing the user to make a query to prevent malicious input

	const res = await fetch(`http://localhost:1323/stories/${params.slug}`);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const story = await res.json()

	return { story };
};
