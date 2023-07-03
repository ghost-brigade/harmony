variable "services" {
  description = "The service to enable. See https://cloud.google.com/service-usage/docs/enabled-service for all services."
  type        = list(string)
  default     = []
}

variable "project_id" {
  description = "The project ID to enable the service on."
  type        = string
}
