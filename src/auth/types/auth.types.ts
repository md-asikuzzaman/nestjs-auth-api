export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}
