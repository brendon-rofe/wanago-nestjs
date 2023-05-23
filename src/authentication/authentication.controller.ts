import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthenticationService } from "./authentication.service";
import { RegisterDto } from "./dto/register.dto";
import { RequestWithUser } from "./requestWithUser.interface";

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {};

  @Post('register')
  async registerUser(@Body() registrationData: RegisterDto ) {
    return await this.authenticationService.register(registrationData);
  };

  @Post('login')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    console.log(request);
    const user = request.body;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  };

};