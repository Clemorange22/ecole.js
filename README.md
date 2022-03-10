# ecole.js

`ecole.js` est une librairie pour Node.js dont le but est de fournir une façon unique d'accéder aux services scolaires français. Elle permet de créer des programmes qui ne seront pas spécifiques à un service en particulier.

Services actuellement supportés : 
* Ecole Directe
* Pronote

## Fonctionnalités

|                 | Ecole Directe | Pronote |
| --------------- | ------------- | ------- |
| Compte Élève    | ✅             | ✅       |
| Classe          | ✅             | ✅       |
| Notes           | ✅             | ✅       |
| Périodes        | ✅             | ✅       |
| Emploi du temps | ✅             | ✅       |
| Devoirs         | ✅             | ✅       |


```typescript
import {
  Session,
  EcoledirecteLoginOptions,
  PronoteLoginOptions,
} from "ecole.js";

(async () => {
  const ecoledirecteSession = new Session(
    new EcoledirecteLoginOptions({
      username: "user",
      password: "password",
    })
  );
  const ecoledirecteAccount = await ecoledirecteSession.login();

  const pronoteSession = new Session(
    new PronoteLoginOptions({
      username: "demonstration",
      password: "pronotevs",
      url: "https://demo.index-education.net/pronote/",
    })
  );

  const pronoteAccount = await pronoteSession.login();

  const ecoledirecteStudentInfo = await ecoledirecteAccount.getStudentInfo();

  const pronoteClass = await pronoteAccount.getClass();

  const pronoteGrades = await pronoteAccount.getGrades();

  const now = new Date(Date.now());
  const ecoledirecteTimetable = await ecoledirecteAccount.getTimetable({
    startDate: now,
    endDate: new Date(now.setDate(now.getDate() + 1)),
  });

  const ecoledirectePeriods = await ecoledirecteAccount.getPeriods();
})();
```
