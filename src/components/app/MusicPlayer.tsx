import SpotifyWebPlayer from 'react-spotify-web-playback'
import { trpc } from 'lib/trpc'
import usePlaybackStore from 'lib/stores/playbackStore'

const MusicPlayer = ({ roomId }: { roomId: string }) => {
  const { data } = trpc.useQuery(['rooms.getToken', { roomId }])
  const playback = usePlaybackStore((state) => state.playback)

  if (!data || !playback) return null

  return (
    <SpotifyWebPlayer
      token={data}
      uris={[playback]}
      styles={{
        sliderHandleColor: '#1db954',
        sliderColor: '#1db954',
      }}
    />
  )
}

export default MusicPlayer
