import { Test } from "@nestjs/testing";

import { AuthorizationService } from "./authorization.service";

describe("AuthorizationService", () => {
  let service: AuthorizationService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthorizationService],
    }).compile();

    service = app.get<AuthorizationService>(AuthorizationService);
  });

  describe("getData", () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: "Hello API" });
    });
  });
});
