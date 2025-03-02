import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPasswordValid } from 'src/validators/password.validator';

export class SignUpDto {
  @ApiProperty({
    example: 'John Doe',
    description:
      'The name of the user. This will be displayed in the user profile and used for identification.',
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    description:
      'The email address of the user. This is used for authentication. It must be a valid email format.',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'yourpassword1234@#',
    description:
      'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.',
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsPasswordValid()
  @MinLength(8)
  password: string;
}
