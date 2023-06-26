export const PostEndpoint = {
  Login: "/login",
  Register: "/register",
} as const;
import { LoginType, UserCreateType } from "@harmony/zod";

export type PostEndpointValue =
  (typeof PostEndpoint)[keyof typeof PostEndpoint];

export type PostEndpointMap = {
  "/login": {
    response: {
      success: boolean;
      token: string;
    };
    body: LoginType;
  };
  "/register": {
    response: {
      success: boolean;
      token: string;
    };
    body: UserCreateType;
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
