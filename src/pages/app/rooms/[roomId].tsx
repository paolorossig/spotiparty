import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react'
import { IoMdMicrophone } from 'react-icons/io'
import { BsClipboard, BsClipboardCheck, BsChevronDown } from 'react-icons/bs'
import useToggle from '@hooks/useToggle'
import useCopyToClipboard from '@hooks/useCopyToClipboard'
import { useGetRoombyIdQuery } from '@features/rooms/roomApi'
import { getSingleRoomResponse } from '@definitions/rooms'
import Toaster from '@components/Toaster'
import AppLayout from '@components/Layouts/AppLayout'

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

  const [showQrCode, toggleQrCode] = useToggle(true)

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
          <section className="relative flex flex-col-reverse items-center rounded-lg border-2 border-gray-700 lg:flex-row">
            <button
              onClick={toggleQrCode}
              className={clsx(
                'absolute right-2 top-2 grid h-8 w-8 transform place-content-center rounded-full bg-gray-700 transition duration-300 hover:bg-gray-800',
                showQrCode ? 'rotate-180' : 'rotate-0',
                'lg:hidden'
              )}
            >
              <BsChevronDown className="text-xl text-white" />
            </button>
            <div
              className={clsx(
                'm-2 flex-1 items-center justify-center gap-2 text-sm md:my-4 md:text-base',
                showQrCode ? 'flex' : 'hidden'
              )}
            >
              <div className="flex flex-col items-center">
                <p className="text-center">
                  Join at spotiparty.vercel.app/app/room/join
                </p>
                <p>or scan the QR Code</p>
              </div>
              <QRCodeSVG value={response.data.linkUrl} size={120} />
            </div>
            <div className="m-2 grid flex-1 place-content-center md:my-4">
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
