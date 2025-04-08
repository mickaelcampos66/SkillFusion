import * as jwt from 'jsonwebtoken';

export class JwtUtil {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
  private static readonly EXPIRES_IN = '12h';

  static sign(payload: object): string {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.EXPIRES_IN,
    });
  }

  static verify(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }
}
