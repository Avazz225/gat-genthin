# gat-genthin

In diesem git-repository wird der Quellcode der Webiste des gat Genthin verwaltet.
Es ist an CI/CD Pipelines angeschlossen, die die Seite stets aktuell halten.

## Aufteilung des Monorepo
Das Frontend wird durch den Ordner "client" bereitgestellt, welcher automatisch auf AWS Amplify deployt wird. Für Strato fällt zusätzlcher administrativer Aufwand an.
Der Ordner "admin" beinhaltet das Administrationsinterface (WIP).

Das (Galerie) Backend wird durch den Ordner "server" bereitgestellt, dessen Inhalt sich auf einem AWS Lambda Server wiederfindet.

Sämtliche Bilder im Ordner "images" werden automatisch durch einen GitHub Job auf AWS S3 kopiert. Die Bilder werden durch ein Content Delivery Network, AWS CloundFront, ausgeliefert.
Selbes gilt für alle Files im Ordner "media". Dieser ist für sich schneller als "images" ändernde Bilder gedacht, da ein redeploy von "images" unerwünschte Auswirkungen auf die Galerie haben kann.

Im Ordner "style" werden alle css Klassen bereitgestellt, die für den Client und die Administration gleich sind (Symlinks in node_modules/style erforderlich).

## Frontend
Technologie: Javascript React

## Backend
Technologie: Python Flask

Die Funktionen des Backends stellen die Logik für die Auslieferung der CDN URLs der Bilder dar.
Jeder Endpunkt legt eine Indexdatei, in der die Ergebnisse der Indexierung persistiert sind, an, falls diese nicht vorhanden ist. Diese werden für eine schnellere Ausführung bei erneutem Aufruf der Funktion verwendet. Die Indexdateien werden bei jedem Update der Bilddateien entfernt, sodass ein erneutes Anlegen erzwungen wird.

Für alle Endpunkte außer "overview" ist der Inhalt der Dateien gleich den zurückgeliferten Daten. Im Fall von "overview" erfolgt noch eine Randomisierung und Reduktion der URLs bevor die Daten zurückgeliefert werden. Dies liegt darin begründet, dass pro Galerie-Kategorie nur drei zufällig ausgewählte Bilder angezeigt werden sollen.
