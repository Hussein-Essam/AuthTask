import { SignUpDto } from './sign-up.dto';
import { OmitType } from '@nestjs/swagger';

export class SignInDto extends OmitType(SignUpDto, ['name'] as const) {}
