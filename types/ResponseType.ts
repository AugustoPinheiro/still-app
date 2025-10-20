export type ResponseType<T> = {
  result: T;
  meta: {
    total: number;
    cursor: number;
  };
};
