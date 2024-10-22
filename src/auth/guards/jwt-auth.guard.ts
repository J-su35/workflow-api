import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

function mapMessage(info: JsonWebTokenError): string {
  if (info.message.includes('malformed')) {
    return `Malformed token`
  }

  if (info.message.includes('expired')) {
    return `token expired`
  }

  return info.message
}
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  //refresh token & validate message
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      console.log('err', err)
      console.log('info', info)
      throw new UnauthorizedException(mapMessage(info));
    }
    return user;
  }

}
