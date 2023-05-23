import { Body, Controller, Post, Req, Res, HttpCode, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthenticationService } from "./authentication.service";
import { RegisterDto } from "./dto/register.dto";
import { RequestWithUser } from "./requestWithUser.interface";
import { LocalAuthenticationGuard } from "./localAuthentication.guard";
import { JwtAuthenticationGuard } from "./jwt-authentication.guard";

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {};

  @Post('register')
  async registerUser(@Body() registrationData: RegisterDto ) {
    return await this.authenticationService.register(registrationData);
  };

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    console.log(request);
    const user = request.body;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader("Set-Cookie", cookie);
    user.password = undefined;
    return response.send(user);
  };

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@Res() response: Response) {
    response.setHeader("Set-Cookie", this.authenticationService.getCookieForLogout());
    return response.sendStatus(200);
  };

};