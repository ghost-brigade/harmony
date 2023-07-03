locals {
  address_names = { for address_name in var.address_names : address_name => address_name }
}

resource "google_compute_global_address" "address_name" {
  for_each = local.address_names

  name = "${var.app_name}-${each.key}"
}
