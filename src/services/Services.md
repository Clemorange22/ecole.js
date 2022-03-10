# Services : Conventions à respecter

Les services intégrés dans ecole.js doivent respecter certaines conventions pour que la librairie puisse être utilisée de la même manière peu importe le service scolaire utilisé



## Emplacement et nom du dossier contenant l'intégration
L'intégration de votre service doit se faire intégralement dans un dossier situé dans `/src/services`, nommé sans majuscules, tout attaché, sans accents. Le nom de ce dossier déterminera la manière dont les variables liées à votre service seront nommées. C'est le nom de votre service dans french-schools. Il sera utilisé pour nommer les fonctions et classes
Exemple: L'intégration d'École Directe est réalisée dans le dossier `/src/services/ecoledirecte`

## Variables exportées

Votre service doit exporter différentes variables pour être utilisable dans french-schools

### NomserviceLoginOptions

Cette variable est une `classe` contenant le type des options devant être fournies par l'utilisateur lors de la connexion à l'aide de votre service

### nomserviceLogin

Cette variable est une fonction qui prend comme argument une instance de la classe `NomserviceLoginOptions`

Elle retourne une instance d'une classe de compte spécifique à votre service, qui représente un compte de votre service. Cette instance de compte doit également respecter certaines conventions, décrites ci-dessous.

### Classes de comptes

Les classes de comptes sont les objets qui représentent dans french-schools un compte utilisateur et qui permettent d'obtenir des informations sur cet utilisateur.

Les instances de compte doivent être dérivées de la classe `BaseAccount` située dans `/src/BaseAccount` (ou `/src/`).

Chaque méthode dont le but est d'uniquement obtenir des données depuis un service scolaire doit être préfixée par `get`, suivi du nom de la classe de la fonctionnalité associée à cette récupération d'information.

Les fonctionnalités sont situées dans le dossier `/src/features`.

Exemple: Pour obtenir les informations générales sur un compte, j'utilise la méthode `account.getStudentInfo()`. Pour récupérer les notes, j'utilise `account.getGrades()`, etc.
