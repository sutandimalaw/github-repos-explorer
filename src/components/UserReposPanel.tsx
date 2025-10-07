import React from 'react'
import { Repo } from "../types/github";
import Spinner from "./Spinner";

interface UserReposPanelProps {
  loading: boolean;
  error: Error | null;
  repos: Repo[];
}


const UserReposPanel =({ loading, error, repos }: UserReposPanelProps) => {
  return (
    <div className="mt-3 pl-6 border-l">
      {loading && <Spinner />}

      {error && (
        <p className="text-slate-500 text-sm" role="alert">
          Failed to load repositories.
        </p>
      )}

      {!loading && repos && (
        <div>
          <ul className="space-y-2">
            {repos.map((repo) => (
              <li
                key={repo.id}
                className="bg-gray-100 border rounded p-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {repo.name}
                  </a>
                  <div className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                    <span>{repo.stargazers_count}</span>
                    <span className="text-black">★</span>
                  </div>
                </div>
                {repo.description && (
                  <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default UserReposPanel