export enum PusherEvents {
  SubscriptionSucceeded = 'pusher:subscription_succeeded',
  MemberAdded = 'pusher:member_added',
  MemberRemoved = 'pusher:member_removed',
}

export enum RoomEvents {
  // Server events
  ChangePlayback = 'room:change_playback',
  // Client events
  ClientRequestSearchTracks = 'client-room:request_search_tracks',
  ClientSendSearchResults = 'client-room:send_search_results',
}
