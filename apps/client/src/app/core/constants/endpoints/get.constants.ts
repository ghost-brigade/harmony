import { ServerType, UserType } from "@harmony/zod";

export const GetEndpoint = {
  Profile: "/profile",
  Servers: "/server",
  ReceivedFriendRequests: "/friend-request/received",
  Friends: "/friends",
  SearchServers: "/server/search",
  BlockedUsers: "/user/blocked",
} as const;

export type GetEndpointValue = (typeof GetEndpoint)[keyof typeof GetEndpoint];

export type GetEndpointMap = {
  "/profile": {
    response: UserType;
  };
  "/server": {
    response: ServerType[];
  };
  "/friend-request/received": {
    response: UserType[];
  };
  "/friends": {
    response: UserType[];
  };
  "/server/search": {
    response: ServerType[];
    queryParams: {
      name: string;
    };
  };
  "/user/blocked": {
    response: UserType[];
  };
};

export type EndpointWithParams = {
  [K in GetEndpointValue]: GetEndpointMap[K] extends { params: unknown }
    ? K
    : never;
}[GetEndpointValue];

export type EndpointWithQueryParams = {
  [K in GetEndpointValue]: GetEndpointMap[K] extends { queryParams: unknown }
    ? K
    : never;
}[GetEndpointValue];

export type GetResponse<Key extends GetEndpointValue> =
  GetEndpointMap[Key]["response"];
export type GetParams<Key extends EndpointWithParams> =
  GetEndpointMap[Key]["params"];
