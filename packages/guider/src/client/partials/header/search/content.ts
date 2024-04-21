import FlexSearch from 'flexsearch';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

type ContentDocument = {
  mainDoc: FlexSearch.Document<
    {
      id: number;
      url: string;
      excerpt: string;
    },
    never[]
  >;
};

type SearchData = Record<
  string,
  {
    excerpt: string;
  }
>;

export type SearchResult = {
  id: string;
  type: 'page' | 'section';
  title: string;
  content: string;
  url: string;
};

let contentPromise: Promise<void> | null = null;
let contentDocument: ContentDocument | null = null;

function loadDocument(basePath: string, key: string): Promise<void> {
  if (contentPromise) return contentPromise;
  const promise = fetchDocument(basePath, key);
  contentPromise = promise;
  return promise;
}

async function fetchDocument(basePath: string, key: string) {
  const res = await fetch(
    `${basePath}/_next/static/chunks/guider-data-${key}.json`,
  );
  const searchData = (await res.json()) as SearchData;
  const searchDocument: ContentDocument['mainDoc'] = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'excerpt',
      store: ['excerpt', 'url'],
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  });

  let pageId = 0;
  for (const [url, data] of Object.entries(searchData)) {
    pageId++;
    searchDocument.add({
      id: pageId,
      url,
      excerpt: data.excerpt,
    });
  }

  contentDocument = {
    mainDoc: searchDocument,
  };
}

export function usePreloadSearch(key: string) {
  const { basePath } = useRouter();
  useEffect(() => {
    void loadDocument(basePath, key);
  }, [basePath, key]);
}

export function useSearch(key: string) {
  const { basePath } = useRouter();
  const [query, setQuery] = useState('');
  const [resultLoading, setResultLoading] = useState(false);
  const [resultLoadingError, setResultLoadingError] = useState(false);
  const [results, setResults] = useState<SearchResult[] | null>(null);

  const doSearch = useCallback(
    async (contentKey: string, searchQuery: string) => {
      setResultLoading(true);
      setResultLoadingError(false);
      try {
        await loadDocument(basePath, contentKey);
        const doc = contentDocument;
        if (!doc) throw new Error('Doc not loaded');
        const docResults =
          doc.mainDoc.search<true>(searchQuery, 5, {
            enrich: true,
            suggest: true,
          })?.[0]?.result ?? [];
        setResults(
          docResults.map((res): SearchResult => {
            return {
              type: 'page',
              id: res.id.toString(),
              title: res.doc.excerpt,
              content: res.doc.excerpt,
              url: res.doc.url,
            };
          }),
        );
      } catch (err) {
        // eslint-disable-next-line no-console -- needs to be logged to console
        console.error('Failed to search', err);
        setResultLoadingError(true);
        setResultLoading(false);
        return;
      }
      setResultLoading(false);
    },
    [basePath],
  );

  const setQueryAndSearch = useCallback(
    (data: string) => {
      setQuery(data);
      void doSearch(key, data);
    },
    [key, doSearch],
  );

  return {
    query,
    setQuery: setQueryAndSearch,
    results,
    loading: resultLoading,
    error: resultLoadingError,
  };
}
