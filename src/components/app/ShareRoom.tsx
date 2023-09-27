import {
  ChevronDownIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { QRCodeSVG } from 'qrcode.react'
import toast from 'react-hot-toast'

import IconButton from '@/components/shared/IconButton'
import useCopyToClipboard from '@/lib/hooks/useCopyToClipboard'
import useToggle from '@/lib/hooks/useToggle'

const ShareRoom = ({ roomId }: { roomId: string }) => {
  const [showQrCode, toggleQrCode] = useToggle(true)
  const [copiedText, copy] = useCopyToClipboard()

  const linkUrl = `${window.location.origin}/app/rooms/${roomId}`

  const copyLink = () => {
    copy(linkUrl)
    toast.success('Link copied succesfully.')
  }

  return (
    <section className="box relative flex flex-col-reverse items-center lg:flex-row">
      <IconButton
        Icon={ChevronDownIcon}
        onClick={toggleQrCode}
        variant="solid"
        className={clsx(
          'absolute right-2 top-2',
          showQrCode ? 'rotate-180' : 'pt-0.5',
          'lg:hidden',
        )}
      />
      <div
        className={clsx(
          'm-2 flex-1 items-center justify-center gap-3 text-sm md:my-4 md:gap-6 md:text-base',
          showQrCode ? 'flex' : 'hidden',
        )}
      >
        <QRCodeSVG value={linkUrl} size={120} />
        <div className="flex flex-col items-center">
          <p className="text-center">Join at spotiparty.vercel.app/join</p>
          <p>or scan the QR Code</p>
        </div>
      </div>
      <div className="m-2 flex flex-1 flex-col items-center md:my-4">
        <span>Room ID:</span>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-semibold">{roomId}</span>
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
