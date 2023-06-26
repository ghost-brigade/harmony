import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { API_BASE_URL } from "../constants/api.constants";
import {
  PostBody,
  PostEndpointValue,
  PostResponse,
  PostEndpointMap,
} from "../constants/endpoints/post.constants";
import {
  PutBody,
  PutEndpointValue,
  PutResponse,
  PutEndpointMap,
} from "../constants/endpoints/put.constants";
import {
  GetEndpointValue,
  GetResponse,
  GetEndpointMap,
} from "../constants/endpoints/get.constants";
import {
  DeleteEndpointValue,
  DeleteResponse,
  DeleteEndpointMap,
} from "../constants/endpoints/delete.constants";
import { map } from "rxjs";
import { AuthService } from "./auth.service";

type PostConfig<Key extends PostEndpointValue> = PostEndpointMap[Key] extends {
  params: infer P;
}
  ? { endpoint: Key; body: PostBody<Key>; params: P }
  : { endpoint: Key; body: PostBody<Key> };

type PutConfig<Key extends PutEndpointValue> = PutEndpointMap[Key] extends {
  params: infer P;
}
  ? { endpoint: Key; body: PutBody<Key>; params: P }
  : { endpoint: Key; body: PutBody<Key> };

type GetConfig<Key extends GetEndpointValue> = GetEndpointMap[Key] extends {
  params: infer P;
  queryParams: infer Q;
}
  ? { endpoint: Key; params: P; queryParams: Q }
  : GetEndpointMap[Key] extends { params: infer P }
  ? { endpoint: Key; params: P }
  : GetEndpointMap[Key] extends { queryParams: infer Q }
  ? { endpoint: Key; queryParams: Q }
  : { endpoint: Key };

type DeleteConfig<Key extends DeleteEndpointValue> =
  DeleteEndpointMap[Key] extends { params: infer P }
    ? { endpoint: Key; params: P }
    : { endpoint: Key };

@Injectable({
  providedIn: "root",
})
export class RequestService {
  http = inject(HttpClient);
  authService = inject(AuthService);

  private setAuthHeader() {
    if (this.authService.$token()) {
      return new HttpHeaders().append(
        "Authorization",
        `Bearer ${this.authService.$token()}`
      );
    } else {
      return new HttpHeaders();
    }
  }

  post<Key extends PostEndpointValue>(config: PostConfig<Key>) {
    const headers = this.setAuthHeader();
    if ("params" in config) {
      const params = config.params as Record<string, string>;
      Object.keys(params).forEach((key) => {
        (config.endpoint as string) = config.endpoint.replace(
          `:${key}`,
          params[key]
        );
      });
    }
    return this.http
      .post<PostResponse<Key>>(
        `${API_BASE_URL}${config.endpoint}`,
        config.body,
        {
          observe: "response",
          headers,
        }
      )
      .pipe(map((response) => response.body as PostResponse<Key>));
  }

  put<Key extends PutEndpointValue>(config: PutConfig<Key>) {
    const headers = this.setAuthHeader();
    if ("params" in config) {
      const params = config.params as Record<string, string>;
      Object.keys(params).forEach((key) => {
        (config.endpoint as string) = config.endpoint.replace(
          `:${key}`,
          params[key]
        );
      });
    }
    return this.http
      .put<PutResponse<Key>>(`${API_BASE_URL}${config.endpoint}`, config.body, {
        observe: "response",
        headers,
      })
      .pipe(map((response) => response.body as PutResponse<Key>));
  }

  get<Key extends GetEndpointValue>(config: GetConfig<Key>) {
    const headers = this.setAuthHeader();
    let queryParams = new HttpParams();
    if ("queryParams" in config) {
      queryParams = new HttpParams({
        fromObject: config.queryParams as Record<string, string>,
      });
    }
    if ("params" in config) {
      const params = config.params as Record<string, string>;
      Object.keys(params).forEach((key) => {
        (config.endpoint as string) = config.endpoint.replace(
          `:${key}`,
          params[key]
        );
      });
    }
    return this.http
      .get<GetResponse<Key>>(`${API_BASE_URL}${config.endpoint}`, {
        observe: "response",
        headers,
        params: queryParams,
      })
      .pipe(map((response) => response.body as GetResponse<Key>));
  }

  delete<Key extends DeleteEndpointValue>(config: DeleteConfig<Key>) {
    const headers = this.setAuthHeader();
    if ("params" in config) {
      const params = config.params as Record<string, string>;
      Object.keys(params).forEach((key) => {
        (config.endpoint as string) = config.endpoint.replace(
          `:${key}`,
          params[key]
        );
      });
    }
    return this.http
      .delete<DeleteResponse<Key>>(`${API_BASE_URL}${config.endpoint}`, {
        observe: "response",
        headers,
      })
      .pipe(map((response) => response.body as DeleteResponse<Key>));
  }
}
