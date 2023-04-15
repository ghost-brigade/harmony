variable "environment" {
  type        = string
  description = "The environment to deploy to"
}
variable "app_name" {
  type        = string
  description = "The name of the application"
}
variable "google_project_id" {
  type        = string
  description = "The project to deploy to"
}
variable "google_region" {
  type        = string
  description = "The region to deploy to"
}
variable "mongodbatlas_public_key" {
  type        = string
  description = "The public key for the MongoDB Atlas API"
}
variable "mongodbatlas_private_key" {
  type        = string
  description = "The private key for the MongoDB Atlas API"
}
variable "mongodbatlas_org_id" {
  type        = string
  description = "The organization ID for the MongoDB Atlas API"
}
variable "mongodbatlas_database_password" {
  type        = string
  description = "The password for the MongoDB Atlas database user"
}
variable "mongodbatlas_cluster_names" {
  type        = list(string)
  description = "The name of the cluster."
  default     = ["account"]
}
