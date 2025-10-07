import type { SearchUsersResponse, Repo } from "../types/github";

const BASE = "https://api.github.com";

export async function searchUsers(q: string): Promise<SearchUsersResponse["items"]> {
  const url = new URL(`${BASE}/search/users`);
  url.searchParams.set("q", q);
  url.searchParams.set("per_page", "5");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Search failed (${res.status})`);
  const data: SearchUsersResponse = await res.json();
  return data.items;
}

export async function listRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`${BASE}/users/${encodeURIComponent(username)}/repos?sort=updated`);
  if (!res.ok) throw new Error(`Fetching repos failed (${res.status})`);
  return res.json() as Promise<Repo[]>;
}