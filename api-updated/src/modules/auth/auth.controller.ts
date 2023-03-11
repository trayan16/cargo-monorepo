import { AuthSignInDto } from './dto/authSignIn.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthSignUpDto } from './dto/authSingUp.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authSignUpDto: AuthSignUpDto) {
    return this.authService.signUp(authSignUpDto);
  }

  @Post('/signin')
  signIn(@Body() authSignIn: AuthSignInDto) {
    return this.authService.signIn(authSignIn);
  }
}
