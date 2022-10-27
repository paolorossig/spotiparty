import { useState } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { trpc } from 'lib/trpc'
import useDebounce from 'lib/hooks/useDebounce'

import Track from './Track'

const Search = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const { data } = trpc.useQuery(
    ['music.searchTracks', { query: debouncedSearch }],
    { enabled: Boolean(debouncedSearch) }
  )

  return (
    <>
      <div className="relative">
        <i className="absolute inset-y-0 z-10 flex items-center pl-2">
          <MagnifyingGlassIcon className="h-7 w-7 text-gray-700" />
        </i>
        <input
          type="text"
          placeholder="Search any song"
          className="pl-10 text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <i
            className="absolute inset-y-0 right-0 z-10 flex items-center px-2 hover:cursor-pointer"
            onClick={() => setSearch('')}
          >
            <XMarkIcon className="h-7 w-7 text-gray-700" />
          </i>
        )}
      </div>
      {data && (
        <ul className="my-6 flex flex-col gap-4">
          {data.map((track) => (
            <Track key={track.id} track={track} />
          ))}
        </ul>
      )}
    </>
  )
}

export default Search
