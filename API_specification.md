# API-Dokumentation (Scalar)

Dieses Projekt verwendet **Scalar**, um eine interaktive Benutzeroberfläche für die API-Spezifikation bereitzustellen. Die Dokumentation wird automatisch auf Basis der `openapi.yaml`-Datei generiert.

## So rufst du die Dokumentation auf

1. **Backend starten:** Stelle sicher, dass deine Spring Boot Anwendung (`tokio-hotel-backend`) läuft.
```bash
cd backend
./mvnw spring-boot:run
```
2. **Browser öffnen:** Navigiere zu der folgenden URL:

   [http://localhost:8080/docs](http://localhost:8080/docs)

   *(Hinweis: Falls du einen anderen Port als 8080 verwendest, passe die URL in deinem Browser entsprechend an.)*