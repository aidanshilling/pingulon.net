import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

export type Story = {
	id: string;
	name: string;
}

export const load: LayoutLoad = async ({ fetch, params }) => {
	const res = await fetch(`https://pingulon-com-api-826899925004.us-east4.run.app/stories`);
	if (!res.ok) throw error(res.status, `HTTP ${res.status}`);
	const stories: Story[] = await res.json()

	return { stories };
};
