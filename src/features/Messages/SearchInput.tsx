import React, { useEffect, useState } from "react";

import SearchInput from "../../components/shared/SearchInput/SearchInput";
import { useMessages } from "../../hooks/app/useMessages";
import { useDebouncedState } from "../../hooks/shared/useDebouncedState";

const MessagesSearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedState(query, 300);
  const { setSearchQuery } = useMessages();

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <div className="py-2 px-4">
      <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
};

export default React.memo(MessagesSearchInput);
