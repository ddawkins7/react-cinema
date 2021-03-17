provider "aws" {
  region = "us-east-2"
}

terraform {
  backend "s3" {
    bucket  = "react-movies-tf-state"
    key     = "react-movies-tfstate"
    region  = "us-east-2"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManageBy    = "Terraform"
    Owner       = "Dwyane Dawkins"
  }
}
