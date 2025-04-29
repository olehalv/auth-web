import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/utils';

export function useData<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await fetchData<T>(path);

      if (res.error) {
        setError(res.error);
      } else if (res.data) {
        setData(res.data);
      }

      setLoading(false);
    })();
  }, [path]);

  return { data, loading, error };
}
