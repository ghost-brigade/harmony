import { AccountService } from "./account.service";
import { Controller, Get } from "@nestjs/common";

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
  ) {}

  @Get()
  async account() {
    return await this.accountService.getAccount();
  }
}
