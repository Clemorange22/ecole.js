# ecole.js

`ecole.js` est une librairie pour Node.js dont le but est de fournir une façon unique d'accéder aux services scolaires français. Elle permet donc de créer des programmes qui ne seront pas spécifiques à un service en particulier.

Services actuellement supportés : 
* Ecole Directe
* Pronote

```typescript
import { Session, EcoledirecteLoginOptions, PronoteLoginOptions } from "ecole.js"

(async () => {

  const ecoledirecteSession = new Session(new EcoledirecteLoginOptions({
    username: "user",
    password: "password"
  }))

  const pronoteSession = new Session(new PronoteLoginOptions({
    username: "demonstration",
    password: "pronotevs",
    url: "https://demo.index-education.net/pronote/"
  }))

})();
```
## Fonctionnalités

|                 | Ecole Directe         | Pronote               |
| --------------- | --------------------- | --------------------- |
| Compte Élève    | ✅                     | ✅                     |
| Classe          | ✅                     | ✅                     |
| Notes           | ✅                     | ✅                     |
| Périodes        | ✅                     | ✅                     |
| Emploi du temps | ✅                     | ✅                     |
| Devoirs         | Pas encore implémenté | Pas encore implémenté |
