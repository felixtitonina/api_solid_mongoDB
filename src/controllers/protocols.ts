export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttRequest<B> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
  body?: B;
}
