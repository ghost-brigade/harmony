import { z } from "nestjs-zod/z";
import { createZodDto } from "nestjs-zod";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

class LoginResponseDto {
  @ApiProperty({
    description: "JWT token",
    type: String,
  })
  access_token: string = "test";
}

type loginType = z.infer<typeof loginSchema>;

class LoginDto extends createZodDto(loginSchema) { }

export { loginSchema, loginType, LoginDto, LoginResponseDto };
