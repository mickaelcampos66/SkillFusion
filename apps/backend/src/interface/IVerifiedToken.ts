export interface IVerifiedToken {
  sub: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
