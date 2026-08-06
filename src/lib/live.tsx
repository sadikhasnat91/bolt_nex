import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { getContent, getSettings } from '@/lib/api';

interface LiveMessage {
  collection?: string;
  key?: string;
}

type Listener = (msg: LiveMessage) => void;

const LiveContext = createContext<{ subscribe: (fn: Listener) => () => void } | null>(null);

export function LiveProvider({ children }: { children: ReactNode }) {
  const listenersRef = useRef(new Set<Listener>());

  useEffect(() => {
    const source = new EventSource('/api/events');
    source.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data) as LiveMessage;
        listenersRef.current.forEach((fn) => fn(msg));
      } catch {
        // ignore malformed events
      }
    };
    return () => source.close();
  }, []);

  const subscribe = (fn: Listener) => {
    listenersRef.current.add(fn);
    return () => listenersRef.current.delete(fn);
  };

  return <LiveContext.Provider value={{ subscribe }}>{children}</LiveContext.Provider>;
}

function useLive() {
  const ctx = useContext(LiveContext);
  if (!ctx) throw new Error('useLive must be used within a LiveProvider');
  return ctx;
}

export function useContent<T>(collection: string, fallback: (T & { id: string })[]): (T & { id: string })[] {
  const [data, setData] = useState<(T & { id: string })[]>(fallback);
  const { subscribe } = useLive();

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      getContent<T>(collection)
        .then((items) => {
          if (!cancelled) {
            setData(Array.isArray(items) && items.length > 0 ? items : fallback);
          }
        })
        .catch(() => {});
    };
    load();
    return subscribe((msg) => {
      if (msg.collection === collection) load();
    });
  }, [collection]);

  return data;
}

export function useSettings<T>(key: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);
  const { subscribe } = useLive();

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      getSettings<T>(key)
        .then((value) => {
          if (!cancelled) setData(value);
        })
        .catch(() => {});
    };
    load();
    return subscribe((msg) => {
      if (msg.key === key) load();
    });
  }, [key]);

  return data;
}
