import { IdType, SearchResponseType } from "@harmony/zod";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Client } from "typesense";
import { CollectionFieldSchema } from "typesense/lib/Typesense/Collection";

@Injectable()
export class TypesenseService {
  private client: Client;
  private collectionName = "messages";

  constructor() {
    this.client = new Client({
      nodes: [
        {
          host: process.env.TYPESENSE_HOST,
          port: Number(process.env.TYPESENSE_PORT),
          protocol: "http",
        },
      ],
      apiKey: process.env.TYPESENSE_API_KEY,
      connectionTimeoutSeconds: 2,
    });
  }

  async createOrCheckIfCollectionExists(fields: CollectionFieldSchema[]) {
    try {
      await this.client.collections().create({
        name: this.collectionName,
        default_sorting_field: "created_at",
        fields,
      });

      return true;
    } catch (error) {
      if (error.name === "ObjectAlreadyExists") {
        return true;
      }

      throw new RpcException(
        new InternalServerErrorException("Error creating collection")
      );
    }
  }

  async getDocumentById(id: IdType): Promise<SearchResponseType> {
    try {
      const document = await this.client
        .collections(this.collectionName)
        .documents(id)
        .retrieve();

      if (document === undefined) {
        throw new RpcException(
          new InternalServerErrorException("Document not found")
        );
      }

      return document as SearchResponseType;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(`Error getting message ${id}`)
      );
    }
  }

  async createDocument({
    data,
    fields,
  }: {
    data: {
      id: IdType;
      author_id: IdType;
      content: string;
      channel_id: IdType;
    };
    fields: CollectionFieldSchema[];
  }) {
    try {
      await this.createOrCheckIfCollectionExists(fields);

      return await this.client
        .collections(this.collectionName)
        .documents()
        .create(
          Object.assign(
            {
              created_at: Date.now(),
              updated_at: Date.now(),
            },
            data
          )
        );
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error creating document")
      );
    }
  }

  async deleteDocumentById(id: IdType): Promise<boolean> {
    try {
      await this.client.collections(this.collectionName).documents(id).delete();

      return true;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(`Error deleting message ${id}`)
      );
    }
  }

  async updateDocument(
    id: IdType,
    data: {
      content: string;
    }
  ) {
    try {
      return await this.client
        .collections(this.collectionName)
        .documents(id)
        .update(Object.assign({ updated_at: Date.now() }, { ...data }));
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error updating document")
      );
    }
  }

  async find({
    data,
    fields,
  }: {
    data: { content?: string; id?: IdType; channelId?: IdType };
    fields: CollectionFieldSchema[];
  }) {
    if (data.content === undefined && data.id === undefined) {
      throw new RpcException(new InternalServerErrorException("Missing query"));
    }

    try {
      await this.createOrCheckIfCollectionExists(fields);

      if (data.id !== undefined) {
        return await this.getDocumentById(data.id);
      } else {
        return await this.client
          .collections(this.collectionName)
          .documents()
          .search({
            q: data.content,
            query_by: "content",
            filter_by: `channel_id:=${data.channelId}`,
            sort_by: "created_at:desc",
          });
      }
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error searching documents")
      );
    }
  }
}
