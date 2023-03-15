variable "REGION" {
  default = "us-east-1"
}
variable "ZONE1" {
  default = "us-east-1a"
}

variable "ZONE2" {
  default = "us-east-1b"
}

variable "ZONE3" {
  default = "us-east-1c"
}

variable "TAGS" {
  default = {
    Name    = "money-pal-cluster"
    Project = "money-pal app"
    script  = "terraform"
  }
}
