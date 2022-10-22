import clsx from 'clsx'
import toast from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react'
import {
  ChevronDownIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'
import useToggle from 'lib/hooks/useToggle'
import useCopyToClipboard from 'lib/hooks/useCopyToClipboard'

import IconButton from 'components/shared/IconButton'

const ShareRoom = ({ roomId }: { roomId: string }) => {
  const [showQrCode, toggleQrCode] = useToggle(true)
  const [copiedText, copy] = useCopyToClipboard()

  const linkUrl = `${window.location.origin}/app/rooms/${roomId}`

  const copyLink = () => {
    copy(linkUrl)
    toast.success('Link copied succesfully.')
  }

  return (
    <section className="relative flex flex-col-reverse items-center rounded-lg border-2 border-gray-700 lg:flex-row">
      <IconButton
        Icon={ChevronDownIcon}
        onClick={toggleQrCode}
        variant="solid"
        className={clsx(
          'absolute right-2 top-2',
          showQrCode ? 'rotate-180' : 'pt-0.5',
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
          <p className="text-center">Join at spotiparty.vercel.app/join</p>
          <p>or scan the QR Code</p>
        </div>
        <QRCodeSVG value={linkUrl} size={120} />
      </div>
      <div className="m-2 flex flex-1 flex-col items-center md:my-4">
        <h3 className="">Room ID:</h3>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold">{roomId}</h1>
          <IconButton
            Icon={!copiedText ? ClipboardIcon : ClipboardDocumentCheckIcon}
            size="medium"
            onClick={copyLink}
          />
        </div>
      </div>
    </section>
  )
}

export default ShareRoom
