export const PostEndpoint = {
  Login: "/login",
  Register: "/user",
  CreateServer: "/server",
  JoinServer: "/server/join/:serverId",
  AddFriend: "/friend-request/send/:username",
  AcceptFriendRequest: "/friend-request/accept/:friendId",
  DeclineFriendRequest: "/friend-request/reject/:friendId",
  BlockUser: "/user/block/:id",
  UnblockUser: "/user/unblock/:id",
} as const;
import { LoginType, ServerCreateType, UserCreateType } from "@harmony/zod";

export type PostEndpointValue =
  (typeof PostEndpoint)[keyof typeof PostEndpoint];

export type PostEndpointMap = {
  "/login": {
    response: {
      access_token: string;
    };
    body: LoginType;
  };
  "/user": {
    response: object;
    body: UserCreateType;
  };
  "/server": {
    response: object;
    body: ServerCreateType;
  };
  "/server/join/:serverId": {
    response: object;
    params: {
      serverId: string;
    };
    body: undefined;
  };
  "/friend-request/send/:username": {
    response: object;
    params: {
      username: string;
    };
    body: undefined;
  };
  "/friend-request/accept/:friendId": {
    response: object;
    params: {
      friendId: string;
    };
    body: undefined;
  };
  "/friend-request/reject/:friendId": {
    response: object;
    params: {
      friendId: string;
    };
    body: undefined;
  };
  "/user/block/:id": {
    response: object;
    params: {
      id: string;
    };
    body: undefined;
  };
  "/user/unblock/:id": {
    response: object;
    params: {
      id: string;
    };
    body: undefined;
  };
};

export type PostEndpointWithParams = {
  [K in PostEndpointValue]: PostEndpointMap[K] extends { params: unknown }
    ? K
    : never;
}[PostEndpointValue];

export type PostResponse<Key extends PostEndpointValue> =
  PostEndpointMap[Key]["response"];
export type PostBody<Key extends PostEndpointValue> =
  PostEndpointMap[Key]["body"];
export type PostParams<Key extends PostEndpointWithParams> =
  PostEndpointMap[Key]["params"];
