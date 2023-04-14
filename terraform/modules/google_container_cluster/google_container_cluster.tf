resource "google_container_cluster" "primary" {
  name     = var.cluster_name
  location = var.region

  network    = var.vpc_network_name
  subnetwork = var.subnetwork_name

  enable_autopilot = true

  # ip allocation policy is required for autopilot
  # https://github.com/hashicorp/terraform-provider-google/issues/10782
  ip_allocation_policy {
    cluster_ipv4_cidr_block  = ""
    services_ipv4_cidr_block = ""
  }
}




