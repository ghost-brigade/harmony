output "address_name" {
  value = google_compute_global_address.address_name[*].address
}
