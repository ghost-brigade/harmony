provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_record" "root" {
  zone_id = var.cloudflare_zone_id
  name    = var.domain_name
  type    = "A"
  value   = "8.8.8.8"
  ttl     = 3600
}

resource "cloudflare_record" "www" {
  zone_id = var.cloudflare_zone_id
  name    = "www.${var.domain_name}"
  type    = "CNAME"
  value   = var.domain_name
  ttl     = 3600
}
