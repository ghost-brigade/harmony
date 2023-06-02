import { Controller } from "@nestjs/common";
import { FileService } from "./file.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { FILE_MESSAGE_PATTERN } from "@harmony/service-config";
import { FileCreateType, FileType, UserContextType } from "@harmony/zod";
// Due to a bug we need to import Multer without using it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";
import { UserContext } from "@harmony/nest-microservice";
@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @MessagePattern(FILE_MESSAGE_PATTERN.FIND_ALL)
  findAll(): Promise<FileType[]> {
    return this.fileService.findAll();
  }

  @MessagePattern(FILE_MESSAGE_PATTERN.FIND_BY_ID)
  async findById(@Payload() payload: { id: string }): Promise<FileType> {
    return await this.fileService.findById(payload);
  }

  @MessagePattern(FILE_MESSAGE_PATTERN.CREATE)
  async create(
    @Payload() payload: { file: Express.Multer.File } & FileCreateType,
    @UserContext() user: UserContextType
  ): Promise<FileType> {
    return await this.fileService.create(payload, user);
  }

  @MessagePattern(FILE_MESSAGE_PATTERN.DELETE)
  async delete(
    @Payload() payload: { id: string },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.fileService.delete(payload, user);
  }
}
