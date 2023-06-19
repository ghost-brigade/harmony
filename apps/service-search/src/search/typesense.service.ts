import { IdType } from "@harmony/zod";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Client } from "typesense";

@Injectable()
export class TypesenseService {
  private client: Client;
  private collectionName = "messages";

  constructor() {
    this.client = new Client({
      nodes: [
        {
          host: "typesense",
          port: 8108,
          protocol: "http",
        },
      ],
      apiKey: process.env.TYPESENSE_API_KEY,
      connectionTimeoutSeconds: 2,
    });
  }

  async createOrCheckIfCollectionExists(): Promise<boolean> {
    try {
      await this.client.collections().create({
        name: this.collectionName,
        fields: [
          { name: "id", type: "string" } /* equivalent to message_id */,
          { name: "author_id", type: "string", facet: true },
          { name: "text", type: "string" },
          { name: "created_at", type: "int64", facet: true },
          { name: "updated_at", type: "int64", facet: true },
        ],
        default_sorting_field: "created_at",
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

  async getDocumentById(id: IdType) {
    try {
      const document = await this.client
        .collections(this.collectionName)
        .documents(id)
        .retrieve();

      console.log("document", document);

      if (document === undefined) {
        throw new RpcException(
          new InternalServerErrorException("Document not found")
        );
      }

      return document;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(`Error getting message ${id}`)
      );
    }
  }

  async createDocument(data: { id: IdType; author_id: IdType; text: string }) {
    try {
      await this.createOrCheckIfCollectionExists();

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
      text: string;
    }
  ) {
    try {
      await this.client
        .collections(this.collectionName)
        .documents(id)
        .update(Object.assign({ updated_at: Date.now() }, data));
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error updating document")
      );
    }
  }

  async find(data: { text?: string; id?: IdType }) {
    if (data.text === undefined && data.id === undefined) {
      throw new RpcException(new InternalServerErrorException("Missing query"));
    }

    try {
      await this.createOrCheckIfCollectionExists();

      if (data.id !== undefined) {
        return await this.getDocumentById(data.id);
      } else {
        return await this.client
          .collections(this.collectionName)
          .documents()
          .search({
            q: data.text,
            query_by: "text",
          });
      }
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error searching documents")
      );
    }
  }
}
