import Spinner from "./Spinner";
import type { Repo } from "../types/github";
import UserReposPanel from "./UserReposPanel";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type GHUser = {
  login: string;
  avatar_url: string;
  html_url?: string;
};

interface UserListProps {
  users: GHUser[];
  queryLabel: string;
  onPick: (login: string) => void;

  // new props for inline expand
  selected: string | null;
  repos: Repo[];
  loadingRepos: boolean;
  reposError: Error | null;
  onBack: () => void;
}



export default function UserList({
  users,
  queryLabel,
  onPick,
  selected,
  repos,
  loadingRepos,
  reposError,
  onBack,
}: UserListProps) {
  return (
    <div>
      <h2 className="font-bold mb-2">
        Results{queryLabel ? ` for "${queryLabel}"` : "" }
      </h2>

      <ul className="space-y-2">
        {users.map((user) => {
          const isSelected = selected === user.login;
          return (
            <li
              key={user.login}
              className={`border rounded p-3 ${isSelected ? "border-slate-400" : "border-slate-200"}`}
            >
              <button
                onClick={() => (isSelected ? onBack() : onPick(user.login))}
                className="w-full flex items-center justify-between text-left"
                aria-expanded={isSelected}
              >
                {/* Left: avatar + info */}
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className={`leading-tight ${isSelected ? "font-semibold" : ""}`}>
                      {user.login}
                    </span>
                    {user.html_url && (
                      <span className="text-xs text-slate-500">{user.html_url}</span>
                    )}
                  </div>
                </div>

                {/* Right: expand/collapse icon at the far right */}
                <span className="text-slate-500 ml-2" aria-hidden>
                  {isSelected ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>

              {/* Expand repos only for the selected user */}
              {isSelected && (
                <UserReposPanel loading={loadingRepos} error={reposError} repos={repos} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}