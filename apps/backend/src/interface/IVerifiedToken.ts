export interface IVerifiedToken {
  sub: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
