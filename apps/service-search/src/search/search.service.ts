import { Injectable } from "@nestjs/common";
import { TypesenseService } from "./typesense.service";
import { IdType, UserContextType } from "@harmony/zod";

@Injectable()
export class SearchService {
  constructor(private readonly typesenseService: TypesenseService) {}

  async create(payload: { id: IdType; text: string }, user: UserContextType) {
    await this.typesenseService.createDocument({
      id: payload.id,
      author_id: user.id,
      text: payload.text,
    });
  }

  async update(payload: { id: IdType; text: string }, user: UserContextType) {
    await this.typesenseService.updateDocument(payload.id, {
      text: payload.text,
    });
  }

  async delete(payload: { id: IdType }, user: UserContextType) {
    await this.typesenseService.deleteDocumentById(payload.id);
  }

  async find(payload: { text?: string; id?: IdType }, user: UserContextType) {
    return await this.typesenseService.find(payload);
  }
}
