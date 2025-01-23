export type Pagination = {
  offset: number;
  limit: number;
}

export type Order = {
  field: string;
  by: string;
}

export type Filter<T> = {
  [P in keyof T]?: T[P]
}

export type List<T> = {
  filter?: Filter<T>;
  pagination?: Pagination;
  order?: Order;
}