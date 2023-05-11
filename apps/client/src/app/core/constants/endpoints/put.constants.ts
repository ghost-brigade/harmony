export const PutEndpoint = {
  Login: "/login",
  Register: "/register",
  ServerMembers: "/server/:id/members",
  ServerEmoji: "/server/:id/emoji",
} as const;

export type PutEndpointValue = (typeof PutEndpoint)[keyof typeof PutEndpoint];

export type PutEndpointMap = {
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

export type EndpointWithParams = {
  [K in PutEndpointValue]: PutEndpointMap[K] extends { params: unknown }
    ? K
    : never;
}[PutEndpointValue];

export type PutResponse<Key extends PutEndpointValue> =
  PutEndpointMap[Key]["response"];
export type PutBody<Key extends PutEndpointValue> = PutEndpointMap[Key]["body"];
export type PutParams<Key extends EndpointWithParams> =
  PutEndpointMap[Key]["params"];
