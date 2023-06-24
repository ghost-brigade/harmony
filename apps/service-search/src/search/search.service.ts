import { Message } from "./../../../../libs/nest-schemas/src/lib/schemas/message.schema";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { TypesenseService } from "./typesense.service";
import { IdType, UserContextType } from "@harmony/zod";
import { CollectionFieldSchema } from "typesense/lib/Typesense/Collection";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class SearchService {
  constructor(private readonly typesenseService: TypesenseService) {}

  fields: CollectionFieldSchema[] = [
    /* equivalent to message_id */
    { name: "id", type: "string" },
    { name: "author_id", type: "string", facet: true },
    { name: "channel_id", type: "string", facet: true },
    { name: "content", type: "string" },
    { name: "created_at", type: "int64", facet: true },
    { name: "updated_at", type: "int64", facet: true },
  ];

  async create(
    payload: { id: IdType; channelId: IdType; content: string },
    user: UserContextType
  ) {
    try {
      return await this.typesenseService.createDocument({
        data: {
          id: payload.id,
          author_id: user.id,
          content: payload.content,
          channel_id: payload.channelId,
        },
        fields: this.fields,
      });
    } catch (error) {
      if (error.message.includes("Error creating document")) {
        throw new RpcException(
          new BadRequestException(
            "Message with this id already exists in search index"
          )
        );
      } else {
        throw new RpcException(new InternalServerErrorException(error.message));
      }
    }
  }

  async update(
    payload: { id: IdType; content: string },
    user: UserContextType
  ) {
    if (payload.id === undefined) {
      throw new RpcException(
        new BadRequestException("Must provide id to update")
      );
    }

    if (payload.content === undefined) {
      throw new RpcException(
        new BadRequestException("Must provide content to update")
      );
    }

    const document = await this.typesenseService.getDocumentById(payload.id);
    if (document.author_id !== user.id) {
      throw new RpcException(
        new BadRequestException("Cannot update message you did not create")
      );
    }

    return await this.typesenseService.updateDocument(payload.id, {
      content: payload.content,
    });
  }

  async delete(
    payload: { id: IdType },
    user: UserContextType
  ): Promise<boolean> {
    if (payload.id === undefined) {
      throw new RpcException(
        new BadRequestException("Must provide id to delete")
      );
    }

    const document = await this.typesenseService.getDocumentById(payload.id);
    if (document.author_id !== user.id) {
      throw new RpcException(
        new BadRequestException("Cannot delete message you did not create")
      );
    }

    return await this.typesenseService.deleteDocumentById(payload.id);
  }

  async find(
    payload: { content?: string; id?: IdType; channelId?: IdType },
    user: UserContextType
  ) {
    if (payload.id) {
      return await this.typesenseService.find({
        data: payload,
        fields: this.fields,
      });
    }

    if (payload.channelId && payload.content) {
      return await this.typesenseService.find({
        data: payload,
        fields: this.fields,
      });
    }

    throw new RpcException(
      new BadRequestException(
        "Must provide at least one of id or channelId and content"
      )
    );
  }
}
