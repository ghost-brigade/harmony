output "address_name" {
  value = { for key, value in google_compute_global_address.address_name : key => value.address }
}
