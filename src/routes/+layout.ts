import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

type Story = {
	id: string;
	name: string;
}

export const load: LayoutLoad = async ({ fetch, params }) => {
	const res = await fetch(`http://localhost:1323/stories`);
	if (!res.ok) throw error(res.status, `HTTP ${res.status}`);
	const stories: Story[] = await res.json()

	return { stories };
};
