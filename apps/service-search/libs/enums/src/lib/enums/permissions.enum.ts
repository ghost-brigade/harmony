enum Permissions {
  "SERVER_ADMIN" = "SERVER_ADMIN", // All permissions

  "CHANNEL_MANAGE" = "CHANNEL_MANAGE", // Create, delete, update channels
  "CHANNEL_VIEW" = "CHANNEL_VIEW", // View channels
  "ROLE_MANAGE" = "ROLE_MANAGE", // Create, delete, update roles
  "SERVER_MANAGE" = "SERVER_MANAGE", // Update server
  "BAN_MANAGE" = "BAN_MANAGE", // Ban users

  "MESSAGE_CREATE" = "MESSAGE_CREATE", // Create messages
  "MESSAGE_DELETE" = "MESSAGE_DELETE", // Delete messages (Others)
  "MESSAGE_FILE_UPLOAD" = "MESSAGE_FILE_UPLOAD", // Upload files
  "MESSAGE_MENTION_EVERYONE" = "MESSAGE_MENTION_EVERYONE", // Mention everyone in a message
}

export { Permissions };
