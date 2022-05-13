import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const RoomSchema = new mongoose.Schema(
  {
    name: {
      /* The name of the room */

      type: String,
      unique: [true, 'You already created a room with this name'],
      required: [true, 'Please provide a name for this room.'],
      maxlength: [20, 'Name cannot be more than 20 characters'],
    },
    description: {
      /* The description of the room */

      type: String,
      required: [true, 'Please provide a description for this room.'],
      maxlength: [150, 'Description cannot be more than 150 characters'],
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

RoomSchema.plugin(uniqueValidator, {
  message: "MongoServerError: Room's {PATH} has to be unique.",
})

export default mongoose.models.Room || mongoose.model('Room', RoomSchema)
