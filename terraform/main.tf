locals {
  env = "prod"
}

terraform {
  required_version = ">= 0.12.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 3.0"
    }
  }
}

provider "google" {
  project = "${var.project_id}"
  region  = "${var.region}"
  zone    = "${var.zone}"
}

module "gke" {
  source = "./modules/gke"

  env                   = "${local.env}"
  image_tag             = "${var.commit_hash}"
  k8s_master_allowed_ip = "${var.k8s_master_allowed_ip}"
  machine_type          = "n1-standard-1"
  network_name          = "gke-network"
  node_count            = "1"
  region                = "${var.region}"
}
