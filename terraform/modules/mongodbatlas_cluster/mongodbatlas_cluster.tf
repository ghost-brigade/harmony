terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 0.9.0"
    }
  }
}

locals {
  cluster_names = { for name in var.names : name => name }
}

resource "mongodbatlas_cluster" "atlas-cluster" {
  for_each = local.cluster_names

  project_id = var.project_id
  name       = each.key

  auto_scaling_disk_gb_enabled = var.auto_scaling_disk_gb_enabled

  provider_name               = var.provider_name
  backing_provider_name       = var.backing_provider_name
  provider_instance_size_name = each.key == "account" ? "M0" : var.provider_instance_size_name

  provider_region_name        = var.provider_region_name
}
