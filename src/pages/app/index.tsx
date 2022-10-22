import AppLayout from 'components/layout/app'
import Rooms from 'components/app/Rooms'

const App = () => {
  return (
    <AppLayout>
      <h1 className="my-10 text-center text-5xl font-bold">
        Welcome to{' '}
        <span className="text-green-500 hover:animate-pulse">Spotiparty!</span>
      </h1>
      <Rooms />
    </AppLayout>
  )
}

export default App
