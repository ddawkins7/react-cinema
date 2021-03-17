##############################
# S3 RESOURCES

# naming convention:
# react-movies-dev-app
# react-movies-staging-app
# react-movies-production-app
##############################

resource "aws_s3_bucket" "react_movies_s3_bucket" {
  bucket        = "${local.prefix}-app" //use local instead of locals on main.tf
  acl           = "public-read"
  force_destroy = true

  /*   policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${local.prefix}-app/*",
      "Principal": "*"
    }
  ]
}
EOF */

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  versioning {
    enabled = true
  }

  tags = local.common_tags // from common tags
}



resource "aws_s3_bucket_policy" "react_movies_s3_bucket_policy" {
  bucket = aws_s3_bucket.react_movies_s3_bucket.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${local.prefix}-app/*",
      "Principal": "*"
    }
  ]
}
POLICY
}
