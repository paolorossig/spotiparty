import { createPortal } from 'react-dom'
import SpotifyWebPlayer from 'react-spotify-web-playback'
import { trpc } from 'lib/trpc'
import usePlaybackStore from 'lib/stores/playbackStore'

const MusicPlayer = ({ roomId }: { roomId: string }) => {
  const { data: token } = trpc.useQuery(['rooms.getToken', { roomId }])
  const playback = usePlaybackStore((state) => state.playback)

  if (!token || !playback) return null

  return createPortal(
    <div className="flex h-14 items-end">
      <SpotifyWebPlayer
        name="Spotiparty"
        token={token}
        uris={[playback]}
        autoPlay
        magnifySliderOnHover
        syncExternalDevice
        styles={{
          sliderHandleColor: '#1db954',
          sliderColor: '#1db954',
        }}
      />
    </div>,
    document.getElementById('music-player')!
  )
}

export default MusicPlayer
