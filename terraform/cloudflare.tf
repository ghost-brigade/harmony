provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_record" "root" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "A"
  value   = module.google_compute_global_address.address_name[0].address
  proxied = true
}

resource "cloudflare_record" "www" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  type    = "CNAME"
  value   = cloudflare_record.root.name
  proxied = true
}

resource "cloudflare_record" "api" {
  zone_id = var.cloudflare_zone_id
  name    = "api"
  type    = "A"
  value   = module.google_compute_global_address.address_name[1].address
  proxied = true
}

resource "cloudflare_record" "ws" {
  zone_id = var.cloudflare_zone_id
  name    = "ws"
  type    = "A"
  value   = module.google_compute_global_address.address_name[2].address
  proxied = true
}
