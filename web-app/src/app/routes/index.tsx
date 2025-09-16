import * as fs from 'node:fs'
import { createFileRoute, Link, useNavigate, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Button } from '@/app/components/ui/button'
import { QueryClient, queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useStaticQuery } from '@/lib/hooks/query'
import { logout } from '@/lib/auth'

const filePath = '/Users/brymadrid/Desktop/count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()

    await fs.promises.writeFile(filePath, `${count + data}`)
    return count + data
  })

export const Route = createFileRoute('/')({
  component: Home,
  shouldReload: false,
})

const todoQueryOptions = queryOptions({
  queryKey: ['todos'],
  queryFn: async () => {
    const req = await fetch('https://jsonplaceholder.typicode.com/todos')
    const json = await req.json()

    return Promise.resolve(json)
  }
})

const countQueryOptions = queryOptions({
  queryKey: ['count'],
  queryFn: async () => {
    return getCount()
  }
})

const updateCountOptions = (queryClient: QueryClient) => useMutation({
  mutationFn: async () => {
    // await updateCount({ data: count })
  },
  // onSuccess: () => {
  //   // Sync query after mutation
  //   queryClient.invalidateQueries({ queryKey: ['count'] })
  // },
})


function Home() {
  const { session } = Route.useRouteContext()
  const todoQuery = useStaticQuery(todoQueryOptions)
  const countQuery = useQuery(countQueryOptions)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const router = useRouter()

  const countMutate = useMutation({
    mutationFn: async (count: number) => {
      return updateCount({ data: count })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['count']
      })
    }
  })

  return (
    <div>
      <h1 className='text-4xl font-bold'>Hello World</h1>
      <Link to='/login'>Go to login</Link>
      <Button
        className='cursor-pointer'
        type="button"
        onClick={async (e) => {
          e.preventDefault()
          try {

            await logout()
            await router.invalidate()
            navigate({
              to: '/login'
            })
          } catch (error) {
            console.log('errrror @@@@', error)
          }

        }}
      >
        Logout
      </Button>
      <Button
        className='cursor-pointer'
        type="button"
        onClick={async (e) => {
          e.preventDefault()
          countMutate.mutate(1)
        }}
      >
        Add 1 to {countQuery.data}?
      </Button>
    </div>
  )
}
