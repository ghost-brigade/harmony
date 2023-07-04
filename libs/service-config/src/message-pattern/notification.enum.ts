export enum NOTIFICATION_MESSAGE_PATTERN {
  /**
   * Error patterns for notification service
   */
  ERROR = "notification.error",

  /**
   * Message patterns for notification service
   */
  NEW_MESSAGE = "notification.new_message",
  UPDATE_MESSAGE = "notification.update_message",
  DELETE_MESSAGE = "notification.delete_message",

  /**
   * Server patterns for notification service
   */
  NEW_CHANNEL = "notification.new_channel",
  UPDATE_CHANNEL = "notification.update_channel",
  DELETE_CHANNEL = "notification.delete_channel",

  UPDATE_SERVER = "notification.update_server",
  DELETE_SERVER = "notification.delete_server",

  /**
   * Global patterns for notification service
   */
  // USER_STATUS = "notification.user_status",
  NEW_FRIEND_REQUEST = "notification.new_friend_request",
  ACCEPT_FRIEND_REQUEST = "notification.accept_friend_request",
  CANCEL_FRIEND_REQUEST = "notification.cancel_friend_request",

  NEW_SERVER_MESSAGE = "notification.new_server_message",
}
