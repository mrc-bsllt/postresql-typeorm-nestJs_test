import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AtDto } from "./dtos/at.dto"

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'at-secret'
    })
  }

  validate(payload: AtDto) {
    return payload
  }
}