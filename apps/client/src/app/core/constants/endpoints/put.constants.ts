import { UserUpdateType } from "@harmony/zod";

export const PutEndpoint = {
  UpdateUser: "/user",
} as const;

export type PutEndpointValue = (typeof PutEndpoint)[keyof typeof PutEndpoint];

export type PutEndpointMap = {
  "/user": {
    response: object;
    body: UserUpdateType;
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
