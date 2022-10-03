import AppLayout from 'components/layout/app'
import Rooms from 'components/rooms/Rooms'

const App = () => {
  return (
    <AppLayout>
      <h1 className="my-10 text-center text-5xl font-bold">
        Welcome to{' '}
        <a
          className="text-green-500 hover:animate-pulse"
          href="https://github.com/paolorossig/spotiparty"
        >
          Spotiparty!
        </a>
      </h1>
      <Rooms />
    </AppLayout>
  )
}

export default App
