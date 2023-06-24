provider "mongodbatlas" {
  public_key  = var.mongodbatlas_public_key
  private_key = var.mongodbatlas_private_key
}

module "mongodbatlas_project" {
  source       = "./modules/mongodbatlas_project"
  project_name = var.app_name
  org_id       = var.mongodbatlas_org_id
}

module "mongodbatlas_project_ip_whitelist" {
  source      = "./modules/mongodbatlas_project_ip_whitelist"
  project_id  = module.mongodbatlas_project.project.id
  cidr_blocks = ["0.0.0.0/0"]
}

module "mongodbatlas_database_user" {
  source            = "./modules/mongodbatlas_database_user"
  database_names    = var.mongodbatlas_cluster_names
  database_password = var.mongodbatlas_database_password
  role_name         = "readWrite"
  project_id        = module.mongodbatlas_project.project.id
}

module "mongodbatlas_cluster" {
  source                      = "./modules/mongodbatlas_cluster"
  project_id                  = module.mongodbatlas_project.project.id
  names                       = var.mongodbatlas_cluster_names
  provider_instance_size_name = "M2"
}
