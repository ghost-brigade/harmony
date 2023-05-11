export const GetEndpoint = {
  Login: "/login",
  Register: "/register",
  ServerMembers: "/server/:id/members",
  ServerEmoji: "/server/:id/emoji",
} as const;

export type GetEndpointValue = (typeof GetEndpoint)[keyof typeof GetEndpoint];

export type GetEndpointMap = {
  "/login": {
    response: {
      success: boolean;
      token: string;
    };
  };
  "/register": {
    response: {
      success: boolean;
      token: string;
    };
  };
  "/server/:id/emoji": {
    response: {
      success: boolean;
      members: string[];
      w: string;
    };
    params: {
      emoji: string;
    };
  };
  "/server/:id/members": {
    response: {
      success: boolean;
      members: string[];
    };
    params: {
      id: string;
    };
    queryParams: {
      limit?: number;
    };
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
