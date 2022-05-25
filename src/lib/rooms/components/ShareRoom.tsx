import clsx from 'clsx'
import toast from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react'
import { BsChevronDown, BsClipboard, BsClipboardCheck } from 'react-icons/bs'
import useToggle from 'lib/ui/hooks/useToggle'
import useCopyToClipboard from 'lib/ui/hooks/useCopyToClipboard'
import type { Room } from 'types/rooms'

const ShareRoom = ({ room }: { room: Room }) => {
  const [showQrCode, toggleQrCode] = useToggle(true)
  const [copiedText, copy] = useCopyToClipboard()

  const copyLink = () => {
    copy(room.linkUrl ?? '')
    toast.success('Link copied succesfully.')
  }

  return (
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
        <QRCodeSVG value={room.linkUrl} size={120} />
      </div>
      <div className="m-2 flex flex-1 flex-col items-center md:my-4">
        <h3 className="">Room ID:</h3>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{room._id}</h1>
          <button
            onClick={copyLink}
            className="rounded-full p-3 hover:bg-gray-600"
          >
            {!copiedText ? (
              <BsClipboard className="text-xl" strokeWidth={'0.5'} />
            ) : (
              <BsClipboardCheck className="text-xl" strokeWidth={'0.5'} />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ShareRoom
