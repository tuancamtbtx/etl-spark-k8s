# Stage: base
FROM openjdk:11-jdk-slim  AS base

# Define ENV variables
ENV SPARK_HOME=/opt/spark
ENV spark_uid=185

# Run Commands

RUN set -ex && \
    apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y  bzip2 python3 python3-pip tini gosu openssl tar curl && \
    apt-get clean autoclean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/ && \ 
    groupadd --system --gid=${spark_uid} spark && \
    useradd --system --uid=${spark_uid} --gid=spark spark && \ 
    mkdir -p /opt/spark && \
    mkdir ${SPARK_HOME}/python && \
    mkdir -p ${SPARK_HOME}/examples && \
    mkdir -p ${SPARK_HOME}/work-dir && \
    touch ${SPARK_HOME}/RELEASE && \
    chown -R spark:spark /opt/spark && \
    rm /bin/sh && \
    ln -sv /bin/bash /bin/sh && \
    echo "auth required pam_wheel.so use_uid" >> /etc/pam.d/su && \
    chgrp root /etc/passwd && chmod ug+rw /etc/passwd 
    
# Stage: spark-base
FROM base AS spark-base
ENV SPARK_HOME=/opt/spark
# Download and extract Spark
# Define default Spark version
ARG SPARK_VERSION_DEFAULT="3.3.0"
ARG HADOOP_VERSION_DEFAULT="3.3.0"
# Define default aws sdk jar version
ARG AWS_JAVA_SDK_VERSION="1.11.868"
ENV AWS_JAVA_SDK_VERSION=${AWS_JAVA_SDK_VERSION}

ENV SPARK_TGZ_URL="https://archive.apache.org/dist/spark/spark-${SPARK_VERSION_DEFAULT}/spark-${SPARK_VERSION_DEFAULT}-bin-without-hadoop.tgz"
ENV HADOOP_TGZ_URL="https://archive.apache.org/dist/hadoop/common/hadoop-${HADOOP_VERSION_DEFAULT}/hadoop-${HADOOP_VERSION_DEFAULT}.tar.gz"
ENV HADOOP_HOME="/opt/hadoop"  
ENV PATH="${SPARK_HOME}/bin:${HADOOP_HOME}/bin:$PATH"  
WORKDIR ${SPARK_HOME}/work-dir

RUN set -ex; \
    export SPARK_TMP="$(mktemp -d)"; \
    cd $SPARK_TMP; \
    curl -o spark.tgz -L "$SPARK_TGZ_URL"; \
    tar -xf spark.tgz --strip-components=1; \
    chown -R spark:spark .; \
    mv jars ${SPARK_HOME}/; \
    mv bin ${SPARK_HOME}/; \
    mv sbin ${SPARK_HOME}/; \
    mv kubernetes/dockerfiles/spark/decom.sh ${SPARK_HOME}; \
    mv examples ${SPARK_HOME}/; \
    mv kubernetes/tests ${SPARK_HOME}/; \
    mv data ${SPARK_HOME}/; \
    mv python/pyspark ${SPARK_HOME}/python/pyspark/; \
    mv python/lib ${SPARK_HOME}/python/lib/; \
    rm -rf "$SPARK_TMP"; 

#Install Hadoop
RUN set -ex; \
    export HADOOP_TMP="$(mktemp -d)"; \
    cd $HADOOP_TMP; \
    curl -o hadoop.tgz -L "$HADOOP_TGZ_URL"; \
    mkdir -p ${HADOOP_HOME}; \
    tar -xf hadoop.tgz -C ${HADOOP_HOME} --strip-components=1; \
    rm -rf "$HADOOP_TMP"; \
    # Download S3 jar
    ls -la ${HADOOP_HOME}; \ 
    ls -al ${HADOOP_HOME}/share/hadoop/tools/lib/aws-java-sdk-bundle-*.jar; \
    rm -fv ${HADOOP_HOME}/share/hadoop/tools/lib/aws-java-sdk-bundle-*.jar; \
    curl -L https://repo1.maven.org/maven2/com/amazonaws/aws-java-sdk-bundle/${AWS_JAVA_SDK_VERSION}/aws-java-sdk-bundle-${AWS_JAVA_SDK_VERSION}.jar \
    -o ${HADOOP_HOME}/share/hadoop/common/lib/aws-java-sdk-bundle-${AWS_JAVA_SDK_VERSION}.jar; \
    cp -vf ${HADOOP_HOME}/share/hadoop/common/lib/aws-java-sdk-bundle-${AWS_JAVA_SDK_VERSION}.jar ${HADOOP_HOME}/share/hadoop/tools/lib/aws-java-sdk-bundle-${AWS_JAVA_SDK_VERSION}.jar; \
    # S3 dependencies # hadoop-aws + jets3t https://stackoverflow.com/questions/58415928/spark-s3-error-java-lang-classnotfoundexception-class-org-apache-hadoop-f
    curl -L https://repo1.maven.org/maven2/org/apache/hadoop/hadoop-aws/${SPARK_VERSION_DEFAULT}/hadoop-aws-${SPARK_VERSION_DEFAULT}.jar \
    -o ${HADOOP_HOME}/share/hadoop/common/lib/hadoop-aws-${SPARK_VERSION_DEFAULT}.jar \ 
    curl -L https://repo1.maven.org/maven2/net/java/dev/jets3t/jets3t/0.9.4/jets3t-0.9.4.jar \
    -o ${HADOOP_HOME}/share/hadoop/common/lib/jets3t-0.9.4.jar; \
    chown -R spark:spark  ${HADOOP_HOME};
    
# Add dependent jars
COPY ./jars /opt/spark-jars/

RUN chmod g+w ${SPARK_HOME}/work-dir
RUN chmod a+x ${SPARK_HOME}/decom.sh


# Stage: spark-with-python
FROM spark-base AS spark-with-python
USER root
# Set SPARK_HOME
ENV SPARK_HOME=/opt/spark
ENV SPARK_DIST_CLASSPATH="/opt/hadoop/etc/hadoop:/opt/hadoop/share/hadoop/common/lib/*:/opt/hadoop/share/hadoop/common/*:/opt/hadoop/share/hadoop/hdfs:/opt/hadoop/share/hadoop/hdfs/lib/*:/opt/hadoop/share/hadoop/hdfs/*:/opt/hadoop/share/hadoop/mapreduce/*:/opt/hadoop/share/hadoop/yarn:/opt/hadoop/share/hadoop/yarn/lib/*:/opt/hadoop/share/hadoop/yarn/*"
ENV SPARK_EXTRA_CLASSPATH="${SPARK_DIST_CLASSPATH}"
ENV PYTHONPATH=$SPARK_HOME/python/:$PYTHONPATH

RUN chown -R spark ${SPARK_HOME} \
    && chmod -R 0700  ${SPARK_HOME}

# Copy Local entrypoint
COPY entrypoint.sh ${SPARK_HOME}
RUN chmod a+x ${SPARK_HOME}/entrypoint.sh
ENTRYPOINT [ "/opt/spark/entrypoint.sh" ]