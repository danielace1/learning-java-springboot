## commands

.\mvnw.cmd clean
.\mvnw.cmd spring-boot:run

.\mvnw.cmd clean compile

mvn spring-boot:run

Remove-Item -Recurse -Force .\target
.\mvnw.cmd clean compile

.\mvnw.cmd spring-boot:run

.\mvnw.cmd clean
.\mvnw.cmd compile
.\mvnw.cmd spring-boot:run

java -version
mvn -version
.\mvnw.cmd -version

      "vmArgs": "-Dspring.profiles.active=prod"

`$env:`

## for eureka server

Configure application.properties
In eureka-server/src/main/resources/application.properties:

```
spring.application.name=eureka-server
server.port=8761

eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
```

```
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2025.1.2</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

- B. Update Auth Service properties
  Keep your existing database, JWT, and other properties. Add the following:

```
spring.application.name=auth-service
server.port=8081

eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/
```

- Update Task Service properties

```
  spring.application.name=task-service
  server.port=8082

eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/
```
