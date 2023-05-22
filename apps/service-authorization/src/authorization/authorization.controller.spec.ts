import { Test, TestingModule } from "@nestjs/testing";

import { AuthorizationController } from "./authorization.controller";
import { AuthorizationService } from "./authorization.service";

describe("AppController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthorizationController],
      providers: [AuthorizationService],
    }).compile();
  });

  describe("getData", () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AuthorizationController>(
        AuthorizationController
      );
      expect(appController.getData()).toEqual({ message: "Hello API" });
    });
  });
});
