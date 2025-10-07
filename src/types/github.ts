export type SearchUsersResponse = {
  items: Array<{
    login: string;
    id: number;
    avatar_url: string;
  }>;
};

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
};