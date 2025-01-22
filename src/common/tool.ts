import { LENGTH_RANDOM_HASH } from './constants';
import * as randToken from 'rand-token';

export function randomString(): string {
  const length = LENGTH_RANDOM_HASH;
  return randToken.generate(length);

}