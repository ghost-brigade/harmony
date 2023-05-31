import { Injectable } from "@nestjs/common";

@Injectable()
export class FileService {
  public async findById(id: string) {
    return {};
  }

  public async create() {
    return {
      id: "123",
    };
  }
}
