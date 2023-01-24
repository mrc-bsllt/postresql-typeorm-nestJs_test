import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Request } from "express"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt-secret',
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: any) {
    const [_, refresh_token] = req.get('authorization').split(' ')
    
    return {
      ...payload,
      refresh_token
    }
  }
}