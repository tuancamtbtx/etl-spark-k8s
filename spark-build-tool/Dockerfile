# stage build
FROM maven:3.6.3-jdk-11-slim AS build
WORKDIR /build

# ARG GITHUB_USERNAME
# ARG GITHUB_TOKEN
# ENV GITHUB_USERNAME="$GITHUB_USERNAME"
# ENV GITHUB_TOKEN="$GITHUB_TOKEN"
# RUN echo $GITHUB_USERNAME
# RUN echo $GITHUB_TOKEN

 # copy source code to /build/src
COPY src /build/src
 # copy maven file to /build
COPY pom.xml /build
 # build java with maven

RUN mvn -f /build/pom.xml  clean package
FROM spark:3.5.1

ENV SPARK_HOME /opt/spark

WORKDIR /opt/spark/

# copy /py files 
COPY --from=build build/target/spark-build-tool-1.0.0.jar spark-build-tool.jar

# necessary to install dependencies using pip and use apt-get install
USER root

RUN apt-get --assume-yes --no-install-recommends install python3

# unchecked dependency issue related to pycairo exists in the base image.
# To resolve them, run the following commands:
# Source: https://github.com/3b1b/manim/issues/751

RUN apt-get --assume-yes --no-install-recommends install python3-pip

