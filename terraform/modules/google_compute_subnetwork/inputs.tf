variable "subnetwork_name" {
  description = "The name of the subnetwork"
  type        = string
  default     = "default"
}

variable "ip_cidr_range" {
  description = "The IP CIDR range of the subnetwork"
  type        = string
  default     = "10.0.0.0/24"
}

variable "vpc_self_link" {
  description = "The self link of the VPC"
  type        = string
}
