resource "google_compute_subnetwork" "subnet" {
  name          = var.subnetwork_name
  ip_cidr_range = var.ip_cidr_range
  network       = var.vpc_self_link
}
