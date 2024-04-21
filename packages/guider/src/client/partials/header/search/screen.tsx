import Link from 'next/link';
import { Icon } from '../../../components/icon';
import type { SearchResult } from './content';
import { useSearch } from './content';

const iconMap = {
  page: 'tabler:file-filled',
  section: 'majesticons:text',
} as const;

function SearchResults(props: { results: SearchResult[] }) {
  return (
    <div className="gd-p-2 gd-space-y-2 gd-border-t gd-border-bgLightest">
      {props.results.map((v) => {
        return (
          <article>
            <Link
              href={v.url}
              key={v.id}
              className="gd-p-3 hover:gd-bg-primaryDark gd-group gd-duration-100 gd-transition-colors gd-rounded-lg gd-flex gd-gap-4 gd-items-center gd-relative"
            >
              <div className="gd-flex gd-items-center gd-transition-colors gd-duration-100 gd-justify-center gd-h-10 gd-w-10 gd-rounded-sm gd-bg-bgLightest group-hover:gd-bg-primaryLight gd-text-textLight group-hover:gd-text-primaryDark">
                <Icon icon={iconMap[v.type]} />
              </div>
              <div>
                <h2 className="gd-text-white gd-line-clamp-1 gd-text-sm gd-font-bold">
                  {v.title}
                </h2>
                <p className="group-hover:gd-text-white gd-transition-colors gd-duration-100 gd-text-text gd-line-clamp-1 gd-text-sm">
                  {v.content}
                </p>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export function SearchScreen(props: { searchKey: string }) {
  const { error, loading, results, query, setQuery } = useSearch(
    props.searchKey,
  );
  return (
    <div className="gd-bg-bg gd-border gd-border-bgLightest gd-rounded-lg">
      <div className="gd-w-full gd-h-14 gd-relative">
        <input
          className="gd-w-full gd-pl-16 gd-h-full gd-text-textHeading gd-bg-transparent focus:gd-outline-none placeholder:gd-text-text placeholder:gd-text-opacity-75"
          placeholder="Search for anything you wish to know..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          type="text"
          autoFocus
        />
        <div className="gd-absolute gd-left-6 gd-w-4 gd-inset-y-0 gd-flex gd-justify-center gd-items-center">
          <Icon
            icon="mingcute:search-2-fill"
            className="gd-text-lg gd-opacity-50"
          />
        </div>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Failed to load search results</p>
        ) : results && results.length === 0 ? (
          <p>No results</p>
        ) : results ? (
          <SearchResults results={results} />
        ) : null}
      </div>
    </div>
  );
}
