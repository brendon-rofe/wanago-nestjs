import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {};

  @Post('register')
  async registerUser(@Body() registrationData: RegisterDto ) {
    return await this.authenticationService.register(registrationData);
  };

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    
  };

};