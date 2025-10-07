import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";

import Spinner from "./components/Spinner";
import { searchUsers, listRepos } from "./api/github";
import { useDebounce } from "./hooks/useDebounce";
import type { Repo } from "./types/github";

const qc = new QueryClient();

export default function AppRoot() {
  return (
    <QueryClientProvider client={qc}>
      <App />
    </QueryClientProvider>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const debounced = useDebounce(query, 300);

  const { data: users = [], isFetching: searching, error: searchError, refetch: refetchUsers } = useQuery({
    queryKey: ["users", debounced],
    queryFn: () => (debounced.trim() ? searchUsers(debounced.trim()) : Promise.resolve([])),
    staleTime: 60_000
  });

  const { data: repos = [], isFetching: loadingRepos, error: reposError } = useQuery<Repo[]>({
    queryKey: ["repos", selected],
    queryFn: () => (selected ? listRepos(selected) : Promise.resolve([])),
    enabled: !!selected
  });

  const handleSubmitSearch = () => refetchUsers();

  return (
    <div className="max-w-[1100px] mx-auto p-4 bg-slate-200 rounded-xl mt-4">
      <section className="bg-white rounded-lg p-4 min-h-[560px]">
        {/* Search panel */}
        <SearchBar value={query} setValue={setQuery} onSubmit={handleSubmitSearch} loading={searching} />
        {searchError && (
          <p className="text-slate-500 text-sm mt-2" role="alert">
            Failed to search users. Please try again.
          </p>
        )}

        {/* Loading state for searching */}
        {searching && <Spinner />}

        {/* Panels */}
        <div>
          {/* Users panel — always visible when there are results */}
          {!searching && users.length > 0 && (
            <UserList
              users={users}
              queryLabel={debounced}
              onPick={(login) => setSelected(login)}
              selected={selected}
              repos={repos}
              loadingRepos={loadingRepos}
              reposError={reposError}
              onBack={() => setSelected(null)}
            />
          )}
          {!searching && users.length === 0 && debounced && (
            <p className="text-slate-500 text-sm">No users found.</p>
          )}
        </div>
      </section>
    </div>
  );
}