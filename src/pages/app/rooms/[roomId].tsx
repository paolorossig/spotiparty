import Image from 'next/image'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { BsClipboard, BsClipboardCheck } from 'react-icons/bs'
import { IoMdMicrophone } from 'react-icons/io'
import { useGetRoombyIdQuery } from '../../../features/rooms/roomApi'
import useCopyToClipboard from '../../../hooks/useCopyToClipboard'
import { getSingleRoomResponse } from '../../../types/rooms'
import AppLayout from '../../../components/Layouts/AppLayout'
import Toaster from '../../../components/Toaster'

const Room = () => {
  const router = useRouter()
  const { roomId } = router.query
  const { data: response, error } = useGetRoombyIdQuery(
    (roomId as string) || ''
    // { pollingInterval: 3000 }
  )
  const [copiedText, copy] = useCopyToClipboard()
  const copyLink = () => {
    copy(response?.data?.linkUrl ?? '')
    toast.success('Link copied succesfully.')
  }

  return (
    <AppLayout>
      {error ? (
        <div className="grid flex-1 place-content-center">
          <p>
            {'data' in error && (error.data as getSingleRoomResponse).error}
          </p>
        </div>
      ) : !response?.data ? (
        <div className="grid flex-1 place-content-center">
          <p>Something went wrong. Please try again later.</p>
        </div>
      ) : (
        <>
          <section className="flex flex-col-reverse items-center rounded-lg border-2 border-gray-700 lg:flex-row">
            <div className="my-2 flex flex-1 items-center justify-center gap-4 text-sm md:my-4 md:text-base">
              <div className="flex flex-col items-center">
                <p>Join at spotiparty.vercel.app/app/room/join</p>
                <p>or scan the QR Code</p>
              </div>
              <div className="h-20 w-20 bg-white" />
            </div>
            <div className="my-2 grid flex-1 place-content-center md:my-4">
              <div className="flex flex-col items-center">
                <h3 className="">Room ID:</h3>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{roomId}</h1>
                  <div className="rounded-full p-3 hover:cursor-pointer hover:bg-gray-600">
                    {!copiedText ? (
                      <BsClipboard
                        onClick={copyLink}
                        className="text-xl"
                        strokeWidth={'0.5'}
                      />
                    ) : (
                      <BsClipboardCheck
                        onClick={copyLink}
                        className="text-xl"
                        strokeWidth={'0.5'}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <br />
          <div>
            <h1 className="mb-2 text-4xl font-bold">
              {response.data.name} Room
            </h1>
            <p className="text-xl text-gray-300">{response.data.description}</p>
            <br />
            <p className="text-gray-300">Members:</p>
            <hr className="my-1 border-gray-700" />
            <ul className="m-4 flex flex-col gap-4">
              {response.data.members.map((member) => (
                <li key={member.accountId} className="flex items-center gap-4">
                  <Image
                    src={
                      member.image ||
                      'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                    }
                    alt="Profile image"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <h3>{member.name}</h3>
                  {member.role === 'owner' && (
                    <IoMdMicrophone className="text-2xl text-yellow-400" />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Toaster />
        </>
      )}
    </AppLayout>
  )
}

export default Room
