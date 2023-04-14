terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 0.9.0"
    }
  }
}

provider "google" {
  project = var.google_project_id
  region  = var.google_region
}

module "google_compute_network" {
  source           = "./modules/google_compute_network"
  vpc_network_name = "default"
}

module "google_compute_subnetwork" {
  source            = "./modules/google_compute_subnetwork"
  subnetwork_name   = "default"
  vpc_self_link     = module.google_compute_network.vpc.self_link
}

module "google_container_cluster" {
  source           = "./modules/google_container_cluster"
  cluster_name     = var.google_project_id
  region           = var.google_region
  vpc_network_name = module.google_compute_network.vpc.name
  subnetwork_name  = module.google_compute_subnetwork.subnet.name
}

# ----------------------------------------

provider "mongodbatlas" {
  public_key = var.mongodbatlas_public_key
  private_key  = var.mongodbatlas_private_key
}

module "mongodbatlas_project" {
  source = "./modules/mongodbatlas_project"
  project_name = var.app_name
  org_id = var.mongodbatlas_org_id
}

module "mongodbatlas_project_ip_whitelist" {
  source = "./modules/mongodbatlas_project_ip_whitelist"
  project_id = module.mongodbatlas_project.project.id
  cidr_blocks = ["0.0.0.0/0"]
}

module "mongodbatlas_database_user" {
  source = "./modules/mongodbatlas_database_user"
  database_names = var.mongodbatlas_cluster_names
  database_password = var.mongodbatlas_database_password
  project_id = module.mongodbatlas_project.project.id
}

module "mongodbatlas_cluster" {
  source = "./modules/mongodbatlas_cluster"
  project_id = module.mongodbatlas_project.project.id
  names = var.mongodbatlas_cluster_names
}
