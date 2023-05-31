import { Controller, Get, Param, Post } from "@nestjs/common";

import { FileService } from "./file.service";
import { Payload } from "@nestjs/microservices";

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  findById(@Param("id") id: string) {
    return this.fileService.findById(id);
  }

  @Post()
  create(@Payload() payload: any) {
    console.log(payload);
    return this.fileService.create();
  }
}
