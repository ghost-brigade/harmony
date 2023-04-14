terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 0.9.0"
    }
  }
}

locals {
  database_names = { for name in var.database_names : name => name }
}

resource "mongodbatlas_database_user" "db-user" {
  for_each = local.database_names

  username = each.key
  password = var.database_password
  project_id = var.project_id
  auth_database_name = var.auth_database_name

  roles {
    role_name     = var.role_name
    database_name = each.key
  }
}
