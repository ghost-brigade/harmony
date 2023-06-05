export const DeleteEndpoint = {
  Login: "/login",
  Register: "/register",
  ServerMembers: "/server/:id/members",
  ServerEmoji: "/server/:id/emoji",
} as const;

export type DeleteEndpointValue =
  (typeof DeleteEndpoint)[keyof typeof DeleteEndpoint];

export type DeleteEndpointMap = {
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
  };
};

export type DeleteEndpointWithParams = {
  [K in DeleteEndpointValue]: DeleteEndpointMap[K] extends { params: unknown }
    ? K
    : never;
}[DeleteEndpointValue];

export type DeleteResponse<Key extends DeleteEndpointValue> =
  DeleteEndpointMap[Key]["response"];
export type DeleteParams<Key extends DeleteEndpointWithParams> =
  DeleteEndpointMap[Key]["params"];
