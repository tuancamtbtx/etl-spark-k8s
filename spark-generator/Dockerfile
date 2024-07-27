# stage build
FROM --platform=linux/amd64 maven:3.6.3-jdk-11-slim AS build
WORKDIR /build

 # copy source code to /build/src
COPY src /build/src
 # copy maven file to /build
COPY pom.xml /build
 # build java with maven
RUN mvn -f /build/pom.xml  clean package

ENV SPARK_VERSION=3.5.1
ENV SPARK_MAJOR_VERSION=3.5
ENV ICEBERG_VERSION=1.5.2

FROM spark:${SPARK_VERSION}
ENV SPARK_HOME=${SPARK_HOME:-"/opt/spark"}

WORKDIR /opt/spark/

COPY ./conf/spark-defaults.conf /opt/spark/conf

# copy /py files 
COPY --chmod=777 --from=build build/target/spark-generator-1.0.0-jar-with-dependencies.jar java/

