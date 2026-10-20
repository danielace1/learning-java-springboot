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

$env:
