# API för arbetserfarenheter
REST API skapat för att hantera arbetserfarenheter.
Byggt med Express.
Innehåller grundläggande funktionalitet för CRUD.

## Länk
Liveversion av API:et finns tillgängligt:

## Installation
API:et använder en PostgreSQL-databas. Efter klonat repository kör kommando npm install för installation av de npm paket som krävs. Kör installationsfilen setup.js för att skapa databas med tabellen workexperience enligt nedan:
| Column | Type |
| ------ | ---- |
| id | SERIAL |
| companyname | TEXT |
| jobtitle | TEXT |
| startdate | DATE |
| enddate | DATE |

## Användning
API:et kan nås på följande sätt:

| Metod | Ändpunkt | Beskrivning |
| ----- | -------- | ----------- |
| GET | /api/workexperience | Hämtar alla work experiences |
| GET | /api/workexperience/:id | Hämtar en specifik work experience |
| POST | /api/workexperience | Lagrar en ny work experience |
| PUT | /api/workexperience/:id | Uppdaterar en existerande work experience |
| DELETE | /api/workexperience/:id | Raderar en work experience utifrån id |

En work experience returneras/skickas som JSON enligt nedan:
```json
{
  "companyname": "Nextjet",
  "jobtitle": "Trafikassistent",
  "startdate": "2013-01-01",
  "enddate": "2016-06-01"
}
```