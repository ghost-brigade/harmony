terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 0.9.0"
    }
  }
}

resource "mongodbatlas_project" "project" {
  name   = var.project_name
  org_id = var.org_id
}
