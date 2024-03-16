import { useCallback, useEffect, useState } from 'react';

export function useVisibleIds(contentId: string, ids: string[]) {
  const [finalList, setFinalList] = useState(ids);

  const check = useCallback(
    (idList: string[]) => {
      const newList: string[] = [];
      idList.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.offsetParent === null) return;
        newList.push(id);
      });
      setFinalList(newList);
    },
    [ids],
  );

  useEffect(() => {
    const targetNode = document.getElementById(contentId);
    if (!targetNode) return;

    const observer = new MutationObserver(() => {
      check(ids);
    });

    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });

    check(ids);

    return () => {
      observer.disconnect();
    };
  }, [contentId, check, JSON.stringify(ids)]);

  return finalList;
}

export function useToc(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    function recheck() {
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const centerTarget = windowHeight / 4;

      const viewList = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return { distance: Infinity, id };
          const rect = el.getBoundingClientRect();
          const distanceTop = Math.abs(centerTarget - rect.top);
          const distanceBottom = Math.abs(centerTarget - rect.bottom);
          const distance = Math.min(distanceBottom, distanceTop);
          return { distance, id };
        })
        .sort((a, b) => a.distance - b.distance);

      if (viewList.length === 0) {
        setActiveId(null);
        return;
      }

      // Check if user has scrolled past the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setActiveId(viewList[0].id);
      } else {
        // shortest distance to the part of the screen we want is the active link
        setActiveId(viewList[0]?.id ?? '');
      }
    }
    document.addEventListener('scroll', recheck);
    recheck();

    return () => {
      document.removeEventListener('scroll', recheck);
    };
  });

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return null;
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: y - 180,
      behavior: 'smooth',
    });
  }, []);

  return { activeId, scrollTo };
}
