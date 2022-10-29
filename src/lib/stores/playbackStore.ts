import create from 'zustand'

interface PlaybackState {
  playback: string
  setPlayback: (playback: string) => void
}

const usePlaybackStore = create<PlaybackState>((set) => ({
  playback: '',
  setPlayback: (playback) => set({ playback }),
}))

export default usePlaybackStore
