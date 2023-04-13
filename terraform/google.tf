provider "google" {
  project = var.google_project_id
  region  = var.google_region
}

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
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

