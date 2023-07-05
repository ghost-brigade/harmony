import { UserUpdateType } from "@harmony/zod";

export const PutEndpoint = {
  UpdateUser: "/user/:id",
  UpdateMessage: "/message/:id",
  UpdateServer: "/server/:id",
} as const;

export type PutEndpointValue = (typeof PutEndpoint)[keyof typeof PutEndpoint];

export type PutEndpointMap = {
  "/user/:id": {
    response: object;
    body: UserUpdateType;
    params: { id: string };
  };
  "/message/:id": {
    response: object;
    body: { content: string };
    params: { id: string };
  };
  "/server/:id": {
    response: object;
    body: { name: string; private: boolean };
    params: { id: string };
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
