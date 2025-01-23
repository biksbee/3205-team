import { List, Order, Pagination } from '../../common/types';

export type LinkCreateType = {
  originalUrl: string;
  fingerprint: string;
  alias?: string;
  expiresAt?: string;
}

export type LinkType = {
  id: number;
  originalUrl: string;
  shortUrl: string;
  clickCount: number;
  expiresAt: Date;
  createdAt: Date;
}

export type ListLinksType = List<LinkType> & {  paginationIp?: Omit<Pagination, 'offset'>, orderIp?: Order; }