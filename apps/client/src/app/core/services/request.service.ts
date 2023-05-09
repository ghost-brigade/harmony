import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RequestService {
  constructor(private http: HttpClient) {}

  private setAuthHeader(token?: string) {
    if (token) {
      return new HttpHeaders().append("Authorization", `Basic ${token}`);
    } else {
      return new HttpHeaders();
    }
  }

  get<T, TError = void>(config: GetOption) {
    config.headers = this.setAuthHeader("");
    return this.http.get<T | TError>(config.url, {
      observe: "response",
      params: config.params,
      headers: config.headers,
    });
  }

  post<T, TBody = void, TError = void>(config: PostOption<TBody>) {
    config.headers = this.setAuthHeader("");
    return this.http.post<T | TError>(config.url, config.body, {
      observe: "response",
      params: config.params,
      headers: config.headers,
    });
  }

  put<T, TBody = void, TError = void>(config: PutOption<TBody>) {
    config.headers = this.setAuthHeader("");
    return this.http.put<T | TError>(config.url, config.body, {
      observe: "response",
      params: config.params,
      headers: config.headers,
    });
  }

  delete<T, TError = void>(config: DeleteOption) {
    config.headers = this.setAuthHeader("");
    return this.http.delete<T | TError>(config.url, {
      observe: "response",
      params: config.params,
      headers: config.headers,
    });
  }
}

type RequestOption<TBody> = {
  headers?: HttpHeaders;
  params?: HttpParams;
  body?: TBody;
  url: string;
};

type GetOption = Omit<RequestOption<never>, "body">;

type PostOption<TBody> = RequestOption<TBody>;

type PutOption<TBody> = RequestOption<TBody>;

type DeleteOption = Omit<RequestOption<never>, "body">;
