import create from 'zustand'

interface PlaybackState {
  playback: string
  setPlayback: (playback: string) => void
  cleanPlayback: () => void
}

const usePlaybackStore = create<PlaybackState>((set) => ({
  playback: '',
  setPlayback: (playback) => set({ playback }),
  cleanPlayback: () => set({ playback: '' }),
}))

export default usePlaybackStore
