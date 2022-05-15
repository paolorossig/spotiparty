import { model, models, Model, Schema } from 'mongoose'
import { nanoid } from '@reduxjs/toolkit'
import uniqueValidator from 'mongoose-unique-validator'
import type { Room } from '@definitions/rooms'

const RoomSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(8),
    },
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
    linkUrl: {
      /* The url of the room */

      type: String,
    },
    qrCodeImageUrl: {
      /* The QR Code image url */

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

const RoomModel: Model<Room> = models.Room || model('Room', RoomSchema)

export default RoomModel
