import { useSession } from 'next-auth/react'
import { createPortal } from 'react-dom'
import SpotifyWebPlayer from 'react-spotify-web-playback'

import usePlaybackStore from '@/lib/stores/playbackStore'

const MusicPlayer = () => {
  const { data: session } = useSession()
  const playback = usePlaybackStore((state) => state.playback)

  if (!session || session.provider !== 'spotify' || !playback) return null

  return createPortal(
    <>
      <div className="h-28 bg-gradient-to-b from-transparent to-gray-800/70" />
      <SpotifyWebPlayer
        name="Spotiparty"
        token={session.accessToken}
        uris={[playback]}
        autoPlay
        magnifySliderOnHover
        syncExternalDevice
        styles={{
          sliderHandleColor: '#1db954',
          sliderColor: '#1db954',
        }}
      />
    </>,
    document.getElementById('music-player')!,
  )
}

export default MusicPlayer
