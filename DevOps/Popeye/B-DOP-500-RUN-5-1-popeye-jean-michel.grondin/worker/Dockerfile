FROM maven:3.5-jdk-8-alpine as builder

COPY ./worker_app /opt

WORKDIR /opt

RUN mvn dependency:resolve
RUN mvn package

FROM openjdk:8-jre-alpine
COPY --from=builder /opt /opt
WORKDIR /opt/target
CMD java -jar worker-jar-with-dependencies.jar