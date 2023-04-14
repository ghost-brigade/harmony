variable "project_id" {
  type        = string
  description = "The ID of the project to create the cluster in."
}

variable "names" {
  type        = list(string)
  description = "The name of the cluster."
  default     = ["test-cluster"]
}

variable "provider_name" {
  type        = string
  description = "The name of the cloud service provider on which Atlas provisions the cluster."
  default     = "TENANT"
}

variable "provider_region_name" {
  type        = string
  description = "The name of the region in which Atlas creates the cluster."
  default     = "WESTERN_EUROPE"
}

variable "backing_provider_name" {
  type        = string
  description = "The name of the cloud service provider on which Atlas provisions the cluster."
  default     = "GCP"
}

# default M0 for now https://www.mongodb.com/docs/atlas/reference/google-gcp/
# free tier
variable "provider_instance_size_name" {
  type        = string
  description = "The name of the compute and memory capacity of the hosts in the cluster."
  default     = "M0"
}

variable "auto_scaling_disk_gb_enabled" {
  type        = bool
  description = "Specifies whether disk auto-scaling is enabled for the cluster."
  default     = false
}
