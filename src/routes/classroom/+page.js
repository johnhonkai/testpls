import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load() {
    // Redirect to the "welcome" page
    throw redirect(307, "/classroom/welcome");
}