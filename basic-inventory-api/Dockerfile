# Etapa de construção
FROM debian:bookworm-20240904-slim AS build

ENV MAVEN_HOME=/opt/maven
ENV PATH="$MAVEN_HOME/bin:$PATH"

ENV JAVA_HOME=/usr/local/jdk-23
ENV PATH="$JAVA_HOME/bin:$PATH"

RUN apt update && apt install -y \
    curl \
    build-essential \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

RUN curl -O https://download.oracle.com/java/23/latest/jdk-23_linux-x64_bin.tar.gz \
    && tar -xzf jdk-23_linux-x64_bin.tar.gz \
    && mv jdk-23 /usr/local/ \
    && rm jdk-23_linux-x64_bin.tar.gz


RUN curl -O https://downloads.apache.org/maven/maven-4/4.0.0-beta-4/binaries/apache-maven-4.0.0-beta-4-bin.tar.gz \
    && tar -xzf apache-maven-4.0.0-beta-4-bin.tar.gz \
    && mv apache-maven-4.0.0-beta-4 /opt/maven \
    && rm apache-maven-4.0.0-beta-4-bin.tar.gz

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests -e

FROM debian:bookworm-20240904-slim

ENV JAVA_HOME=/usr/local/jdk-23
ENV PATH="$JAVA_HOME/bin:$PATH"

COPY --from=build /usr/local/jdk-23 /usr/local/jdk-23

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["sh", "-c", "sleep 10 && java -jar app.jar"]
