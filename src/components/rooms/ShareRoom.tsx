import type { Room } from '@prisma/client'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react'
import { BsChevronDown, BsClipboard, BsClipboardCheck } from 'react-icons/bs'
import useToggle from 'lib/hooks/useToggle'
import useCopyToClipboard from 'lib/hooks/useCopyToClipboard'

import IconButton from 'components/shared/IconButton'

const ShareRoom = ({ room }: { room: Room }) => {
  const [showQrCode, toggleQrCode] = useToggle(true)
  const [copiedText, copy] = useCopyToClipboard()

  const linkUrl = `${window.location.origin}/app/rooms/${room.roomId}`

  const copyLink = () => {
    copy(linkUrl)
    toast.success('Link copied succesfully.')
  }

  return (
    <section className="relative flex flex-col-reverse items-center rounded-lg border-2 border-gray-700 lg:flex-row">
      <IconButton
        Icon={BsChevronDown}
        onClick={toggleQrCode}
        variant="solid"
        className={clsx(
          'absolute right-2 top-2 transform transition duration-300',
          showQrCode ? 'rotate-180' : 'rotate-0 pt-[3px]',
          'lg:hidden'
        )}
      />
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
        <QRCodeSVG value={linkUrl} size={120} />
      </div>
      <div className="m-2 flex flex-1 flex-col items-center md:my-4">
        <h3 className="">Room ID:</h3>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold">{room.roomId}</h1>
          <IconButton
            Icon={!copiedText ? BsClipboard : BsClipboardCheck}
            size="medium"
            onClick={copyLink}
            strokeWidth={0.5}
          />
        </div>
      </div>
    </section>
  )
}

export default ShareRoom
