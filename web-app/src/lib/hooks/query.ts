import { QueryClient, useQuery } from '@tanstack/react-query'

export function useSecureQuery(options) {
  return useQuery({
    ...options,
    staleTime: Infinity, // Never refetch sensitive data
    cacheTime: 1000 * 60 * 5, // Short cache for security
    retry: false, // Don't retry sensitive calls
  })
}

export function useRealtimeQuery(options) {
  return useQuery({
    ...options,
    refetchInterval: 30000, // Real-time updates
    staleTime: 0, // Always consider stale
    retry: 3, // Retry for reliability
  })
}

export function useStaticQuery(options) {
  return useQuery({
    ...options,
    staleTime: 1000 * 60 * 60, // 1 hour - rarely changes
    cacheTime: 1000 * 60 * 60 * 24, // 24 hour cache
    retry: 1, // Minimal retries
  })
}

export function createQueryClient(isServer = false) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Server optimizations
        retry: isServer ? false : 2,
        refetchOnWindowFocus: !isServer,
        refetchOnMount: !isServer,
        refetchOnReconnect: !isServer,

        // Shared caching strategy
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
      mutations: {
        retry: isServer ? false : 1,
      },
    },
  })
}
