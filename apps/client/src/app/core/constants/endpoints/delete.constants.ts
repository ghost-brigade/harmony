export const DeleteEndpoint = {
  DeleteFriend: "/friend/delete/:id",
  DeleteMessage: "/message/:id",
  LeaveServer: "/server/leave/:id",
  DeleteServer: "/server/:id",
  DeleteChannel: "/channel/:id",
} as const;

export type DeleteEndpointValue =
  (typeof DeleteEndpoint)[keyof typeof DeleteEndpoint];

export type DeleteEndpointMap = {
  "/friend/delete/:id": {
    response: object;
    params: {
      id: string;
    };
  };
  "/message/:id": {
    response: object;
    params: {
      id: string;
    };
  };
  "/server/leave/:id": {
    response: object;
    params: {
      id: string;
    };
  };
  "/server/:id": {
    response: object;
    params: {
      id: string;
    };
  };
  "/channel/:id": {
    response: object;
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
