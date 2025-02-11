import jwt, { Secret } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { envs } from './envs';

const JWT_SEED: Secret = envs.JWT_SEED;

export class JwtAdapter {
  static async generateToken(
    payload: object,
    duration: StringValue = '1h',
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        resolve(token!);
      });

      resolve(duration);
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded as T);
      });
    });
  }
}
