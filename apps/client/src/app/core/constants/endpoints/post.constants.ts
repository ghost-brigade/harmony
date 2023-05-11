export const PostEndpoint = {
  Login: "/login",
  Register: "/register",
  ServerMembers: "/server/:id/members",
  ServerEmoji: "/server/:id/emoji",
} as const;

export type PostEndpointValue =
  (typeof PostEndpoint)[keyof typeof PostEndpoint];

export type PostEndpointMap = {
  "/login": {
    response: {
      success: boolean;
      token: string;
    };
    body: {
      username: string;
      password: string;
    };
  };
  "/register": {
    response: {
      success: boolean;
      token: string;
    };
    body: {
      username: string;
      password: string;
      rememberMe: boolean;
    };
  };
  "/server/:id/emoji": {
    response: {
      success: boolean;
      members: string[];
      w: string;
    };
    body: {
      serverId: string;
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
    body: {
      serverId: string;
    };
    params: {
      id: string;
    };
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
