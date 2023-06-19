import { z } from "nestjs-zod/z";
import { createZodDto } from "nestjs-zod";
import { ApiProperty } from "@nestjs/swagger";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

class LoginResponseDto {
  @ApiProperty({
    description: "JWT token",
    type: String,
  })
  access_token = "test";
}

type LoginType = z.infer<typeof LoginSchema>;

class LoginDto extends createZodDto(LoginSchema) {}

export { LoginSchema, LoginType, LoginDto, LoginResponseDto };
