variable "app_name" {
  description = "The name of the application."
  type        = string
}

variable "address_names" {
  description = "The list of address names."
  type        = list(string)
  default     = []
}
