ORIGINAL_BRAND_NAME=$(git symbolic-ref --short HEAD)
BRAND_NAME=${ORIGINAL_BRAND_NAME//[\/]/-}
VERSION=v1.0.0
DOCKER_IMAGE=spark_generator
DOCKER_REGISTRY=vantuan12345
#-----------------------------------------------------------------------
docker build . -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${VERSION}
docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${VERSION}