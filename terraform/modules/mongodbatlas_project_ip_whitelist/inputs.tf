variable "cidr_blocks" {
  type = list(string)
  description = "List of CIDR blocks to allow access to the MongoDB Atlas project"
  default = ["0.0.0.0/0"]
}

variable "project_id" {
  type = string
  description = "The MongoDB Atlas project ID"
}
