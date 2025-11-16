import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

type Story = {
	id: string;
	name: string;
}

export const load: LayoutLoad = async ({ params }) => {
	const res = await fetch(`http://localhost:1323/stories`);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const stories: Story[] = await res.json()

	return { stories };
};
