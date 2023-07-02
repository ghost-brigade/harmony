export const PostEndpoint = {
  Login: "/login",
  Register: "/user",
  CreateServer: "/server",
} as const;
import { LoginType, UserCreateType } from "@harmony/zod";

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
    body: {
      name: string;
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
