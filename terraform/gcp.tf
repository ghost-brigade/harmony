provider "google" {
  project = var.google_project_id
  region  = var.google_region
}

data "google_storage_bucket_object" "terraform_bucket" {
  bucket = "harmony-terraform-bucket"
}

resource "google_artifact_registry_repository" "registry" {
  location      = var.google_region
  repository_id = var.app_name
  description   = "Artifact Registry repository for ${var.app_name}"
  format        = "DOCKER"
}

resource "google_compute_global_address" "global_ip" {
  name = "${var.app_name}-global-ip"
}

module "google_compute_network" {
  source           = "./modules/google_compute_network"
  vpc_network_name = var.app_name
}

module "google_compute_subnetwork" {
  source          = "./modules/google_compute_subnetwork"
  subnetwork_name = var.app_name
  vpc_self_link   = module.google_compute_network.vpc.self_link
}

module "google_container_cluster" {
  source           = "./modules/google_container_cluster"
  cluster_name     = "${var.app_name}-gke"
  region           = var.google_region
  vpc_network_name = module.google_compute_network.vpc.name
  subnetwork_name  = module.google_compute_subnetwork.subnet.name
}

