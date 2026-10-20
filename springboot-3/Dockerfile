
FROM eclipse-temurin:24-jdk AS builder

WORKDIR /build
COPY . .
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

FROM eclipse-temurin:24-jre

WORKDIR /app
COPY --from=builder /build/target/demo-0.0.1-SNAPSHOT.jar app.jar
COPY ./src/main/resources/application-prod.properties /app/config/application-prod.properties

ENV SPRING_CONFIG_ADDITIONAL_LOCATION=file:/app/config/
ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["java", "-jar", "app.jar"]
