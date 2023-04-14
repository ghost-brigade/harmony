variable "cluster_name" {
  description = "The name of the GKE cluster"
  type        = string
}

variable "region" {
  description = "The region to deploy the GKE cluster"
  type        = string
  default     = "europe-west9"
}

variable "vpc_network_name" {
  description = "The name of the vpc network"
  type        = string
  default     = "default"
}

variable "subnetwork_name" {
  description = "The name of the subnetwork"
  type        = string
  default     = "default"
}
