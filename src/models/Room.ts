import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema(
  {
    name: {
      /* The name of the room */

      type: String,
      required: [true, 'Please provide a name for this room.'],
      maxlength: [20, 'Name cannot be more than 20 characters'],
    },
    owner: {
      /* The owner's name of the room */

      type: String,
      required: [true, "Please provide the room owner's name"],
    },
    accountId: {
      /* The owner's acoount Id */

      type: String,
      required: [true, 'Please provide the account Id'],
    },
    qrCodeImageUrl: {
      /* The url of the room with the QR Code image */

      type: String,
    },
    members: {
      /* The members of the room */

      type: Array,
      maxlength: [30, 'Rooms cannot contain more than 30 members'],
    },
  },
  { timestamps: true }
)

export default mongoose.models.Room || mongoose.model('Room', RoomSchema)
