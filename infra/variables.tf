variable "aws_region" {
  type        = string
  description = "The AWS region to deploy resources into"
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Name of the project used for resource naming and tagging"
  default     = "secure-static-web"
}

variable "environment" {
  type        = string
  description = "Target deployment environment"
  default     = "production"
}
