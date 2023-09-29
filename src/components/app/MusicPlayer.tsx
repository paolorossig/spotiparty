import { useSession } from 'next-auth/react'
import { createPortal } from 'react-dom'
import SpotifyWebPlayer from 'react-spotify-web-playback'

import usePlaybackStore from '@/lib/stores/playbackStore'

const MusicPlayer = () => {
  const { data: session } = useSession()
  const playback = usePlaybackStore((state) => state.playback)

  if (!session || !playback) return null

  return createPortal(
    <div className="flex h-14 items-end">
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
    </div>,
    document.getElementById('music-player')!,
  )
}

export default MusicPlayer
