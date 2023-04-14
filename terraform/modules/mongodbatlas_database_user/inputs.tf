variable "database_names" {
  description = "The name of the database in the MongoDB deployment."
  type        = list(string)
  default     = []
}

variable "database_password" {
  description = "The password for the database user. The password can contain up to 128 characters, including letters, numbers, and the following characters: @, !, #, $, %, ^, &, *, (, ), -, +, :, ;, <, >, ., ?, /, |, and ,."
  type        = string
}

variable "project_id" {
  description = "The unique identifier of the project for the Atlas cluster."
  type        = string
}

variable "auth_database_name" {
  description = "The name of the database where you want to create the user. If you omit this field, the user is created in the admin database."
  type        = string
  default     = "admin"
}

variable "role_name" {
  description = "The name of the role for the database user. The role can be any built-in role or a custom role for the database."
  type        = string
  default     = "readWriteAnyDatabase"
}

