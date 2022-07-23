import { model, models, Model, Schema } from 'mongoose'
import { nanoid } from '@reduxjs/toolkit'
import uniqueValidator from 'mongoose-unique-validator'
import type { Room as IRoom } from 'types/rooms'

const memberSchema: Schema = new Schema(
  {
    accountId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, required: true },
  },
  { _id: false }
)

const trackSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    uri: { type: String, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    popularity: { type: Number, required: true },
    albumImageUrl: { type: String, required: true },
  },
  { _id: false }
)

const playlistSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    uri: { type: String, required: true },
    spotifyUrl: { type: String, required: true },
  },
  { _id: false }
)

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
    imageUrl: {
      /* The url of the room image */

      type: String,
    },
    /* The members of the room */
    members: [memberSchema],

    /* The tracks of the members of the room */
    tracks: [trackSchema],

    /* The playlist information of the Room */
    playlist: playlistSchema,
  },
  { timestamps: true, versionKey: false }
)

RoomSchema.plugin(uniqueValidator, {
  message: "MongoServerError: Room's {PATH} has to be unique.",
})

const Room: Model<IRoom> = models.Room || model('Room', RoomSchema)

export default Room
