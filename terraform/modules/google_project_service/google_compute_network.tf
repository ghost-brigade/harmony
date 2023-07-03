locals {
  services = { for service in var.services : service => service }
}

resource "google_project_service" "project_services" {
  for_each = local.services

  project = var.project_id
  service = each.key + ".googleapis.com"
}
