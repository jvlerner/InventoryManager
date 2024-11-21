# Etapa de construção
FROM debian:bookworm-20240904-slim AS build

ENV MAVEN_HOME=/opt/maven
ENV PATH="$MAVEN_HOME/bin:$PATH"

ENV JAVA_HOME=/usr/local/jdk
ENV PATH="$JAVA_HOME/bin:$PATH"

RUN apt update && apt install -y \
    curl \
    build-essential \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/local/jdk /opt/maven \
    && curl -k -Lo jdk-linux-x64_bin.tar.gz https://download.oracle.com/java/23/latest/jdk-23_linux-x64_bin.tar.gz \
    && tar -xzf jdk-linux-x64_bin.tar.gz -C usr/local/jdk --strip 1 \
    && rm jdk-linux-x64_bin.tar.gz \
    && curl -k -Lo apache-maven-bin.tar.gz https://downloads.apache.org/maven/maven-4/4.0.0-beta-4/binaries/apache-maven-4.0.0-beta-4-bin.tar.gz \
    && tar -xzf apache-maven-bin.tar.gz -C /opt/maven --strip 1 \
    && rm apache-maven-bin.tar.gz

WORKDIR /app

COPY pom.xml pom.xml
COPY src src

RUN mvn clean package -DskipTests

FROM debian:bookworm-20240904-slim

ENV JAVA_HOME=/usr/local/jdk
ENV PATH="$JAVA_HOME/bin:$PATH"

COPY --from=build /usr/local/jdk /usr/local/jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["sh", "-c", "sleep 20 && java -jar app.jar"]
