import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UserOtpDto {
    @IsNotEmpty()
    @IsNumberString()
    @Type(() => String)
    otp: string;
}
