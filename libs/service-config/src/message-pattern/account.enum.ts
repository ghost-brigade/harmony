export enum ACCOUNT_MESSAGE_PATTERN {
  CREATE = "account.create",
  UPDATE = "account.update",
  REMOVE = "account.remove",
  FIND_ALL = "account.find",
  FIND_ALL_BY_IDS = "account.findAllByIds",
  FIND_ONE = "account.findOne",
  FIND_ONE_FRIEND = "account.findOneFriend",
  PROFILE = "account.profile",
  IS_ACTIVE = "account.isActive",
  IS_EXIST = "account.isExist",
  BANNED_USERS = "account.findAllBannedUsers",
  BAN_USER = "account.banUser",
  CANCEL_BAN_USER = "account.cancelBanUser",
  USERNAME_AVAILABLE = "account.usernameAvailable",
  CHANGE_AVATAR = "account.changeAvatar",
  FIND_ONE_BY_USERNAME = "account.findOneByUsername",
  FIND_ALL_FRIENDS = "account.findAllFriends",
  FIND_ALL_FRIEND_REQUEST = "account.findAllFriendRequest",
  UPDATE_STATUS = "account.updateStatus",
}
