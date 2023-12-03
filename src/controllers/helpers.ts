import { HttpResponse } from './protocols';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: 200,
  body,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: 201,
  body,
});

export const badRequest = (messsage: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: messsage,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: 500,
    body: 'Error interno.',
  };
};
