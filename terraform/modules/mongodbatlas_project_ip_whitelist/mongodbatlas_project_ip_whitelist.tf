terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 0.9.0"
    }
  }
}

resource "mongodbatlas_project_ip_whitelist" "atlas-whitelist-cidr" {
  for_each = toset(var.cidr_blocks)

  project_id = var.project_id
  cidr_block = each.key
}
