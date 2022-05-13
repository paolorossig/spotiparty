import { useRouter } from 'next/router'
import AppLayout from '../../../components/Layouts/AppLayout'

const Room = () => {
  const router = useRouter()
  const { roomId } = router.query

  return (
    <AppLayout>
      <div className="grid flex-1 place-content-center">Room {roomId}</div>
    </AppLayout>
  )
}

export default Room
