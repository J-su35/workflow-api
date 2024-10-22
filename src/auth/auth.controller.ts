import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoggedInDto } from './dto/logged-in.dto';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // no refresh token
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // // login(@Request() request: any) {
  //   login(@Request() request: { user : LoggedInDto }) {
  //   const access_token = this.authService.login(request.user)
  //   return { access_token  };
  // }

  // refresh token
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request: { user: LoggedInDto}) {
    return this.authService.login(request.user);
  }

  //refresh token
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  refreshToken(@Request() request: { user : LoggedInDto }) {
    return this.authService.refreshToken(request.user);
  }

  // waiting
  // @Get('login-oauth2-redirect-url')
  // loginOauth2RedirectUrl(): { redirectUrl: string } {
  //   return { redirectUrl: this.authService.getOauth2RedirectUrl() };
  // }
  
  // @UseGuards(Oauth2AuthGuard)
  // @Post('login-oauth2')
  // loginKeycloak(@Request() request: { user : LoggedInDto }) {
  //   return this.authService.login(request.user)
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
