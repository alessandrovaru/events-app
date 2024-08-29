import {useSearchParams} from 'next/navigation';

export function useRedirectParam(){
  const params = useSearchParams();

  return params?.get('redirect') ?? null;
}