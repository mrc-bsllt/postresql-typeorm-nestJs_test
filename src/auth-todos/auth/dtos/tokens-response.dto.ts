import { IsJWT } from "class-validator"

export class TokensResponse {
  @IsJWT()
  accessToken: string;

  @IsJWT()
  refreshToken: string;
}