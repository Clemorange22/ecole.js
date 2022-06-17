import { login, errors as _errors } from "pronote-api";
import { Session, WrongCredentialsError } from "../..";
import { PronoteStudent } from "./accounts";

/*
- Académie d'Orleans-Tours (CAS : ac-orleans-tours, URL : "ent.netocentre.fr")
- Académie de Besançon (CAS : ac-besancon, URL : "cas.eclat-bfc.fr")
- Académie de Bordeaux (CAS : ac-bordeaux, URL : "mon.lyceeconnecte.fr")
- Académie de Bordeaux 2 (CAS : ac-bordeaux2, URL : "ent2d.ac-bordeaux.fr")
- Académie de Caen (CAS : ac-caen, URL : "fip.itslearning.com")
- Académie de Clermont-Ferrand (CAS : ac-clermont, URL : "cas.ent.auvergnerhonealpes.fr")
- Académie de Dijon (CAS : ac-dijon, URL : "cas.eclat-bfc.fr")
- Académie de Grenoble (CAS : ac-grenoble, URL : "cas.ent.auvergnerhonealpes.fr")
- Académie de la Loire (CAS : cybercolleges42, URL : "cas.cybercolleges42.fr")
- Académie de Lille (CAS : ac-lille, URL : "cas.savoirsnumeriques62.fr")
- Académie de Lille (CAS : ac-lille2, URL : "teleservices.ac-lille.fr")
- Académie de Limoges (CAS : ac-limoges, URL : "mon.lyceeconnecte.fr")
- Académie de Lyon (CAS : ac-lyon, URL : "cas.ent.auvergnerhonealpes.fr)
- Académie de Marseille (CAS : atrium-sud, URL : "atrium-sud.fr")
- Académie de Montpellier (CAS : ac-montpellier, URL : "cas.mon-ent-occitanie.fr")
- Académie de Nancy-Metz (CAS : ac-nancy-metz, URL : "cas.monbureaunumerique.fr")
- Académie de Nantes (CAS : ac-nantes, URL : "cas3.e-lyco.fr")
- Académie de Poitiers (CAS : ac-poitiers, URL : "mon.lyceeconnecte.fr")
- Académie de Reims (CAS : ac-reims, URL : "cas.monbureaunumerique.fr")
- Académie de Rouen (Arsene76) (CAS : arsene76, URL : "cas.arsene76.fr")
- Académie de Rouen (CAS : ac-rouen, URL : "nero.l-educdenormandie.fr")
- Académie de Strasbourg (CAS : ac-strasbourg, URL : "cas.monbureaunumerique.fr")
- Académie de Toulouse (CAS : ac-toulouse, URL : "cas.mon-ent-occitanie.fr")
- Académie du Val-d'Oise (CAS : ac-valdoise, URL : "cas.moncollege.valdoise.fr")
- ENT "Agora 06" (Nice) (CAS : agora06, URL : "cas.agora06.fr")
- ENT "Haute-Garonne" (CAS : haute-garonne, URL : "cas.ecollege.haute-garonne.fr")
- ENT "Hauts-de-France" (CAS : hdf, URL : "enthdf.fr")
- ENT "La Classe" (Lyon) (CAS : laclasse, URL : "www.laclasse.com")
- ENT "Lycee Connecte" (Nouvelle-Aquitaine) (CAS : lyceeconnecte, URL : "mon.lyceeconnecte.fr")
- ENT "Seine-et-Marne" (CAS : seine-et-marne, URL : "ent77.seine-et-marne.fr")
- ENT "Somme" (CAS : somme, URL : "college.entsomme.fr")
- ENT "Portail Famille" (Orleans Tours) (CAS : portail-famille, URL : "seshat.ac-orleans-tours.fr:8443")
- ENT "Toutatice" (Rennes) (CAS : toutatice, URL : "www.toutatice.fr")
- ENT "Île de France" (CAS : iledefrance, URL : "ent.iledefrance.fr")
- ENT "Mon collège Essonne" (CAS : moncollege-essonne, URL : "www.moncollege-ent.essonne.fr")
- ENT "Paris Classe Numerique" (CAS : parisclassenumerique, URL : "ent.parisclassenumerique.fr")
- ENT "Lycee Jean Renoir Munich" (CAS : ljr-munich, URL : "cas.kosmoseducation.com")
- ENT "L'Eure en Normandie" (CAS : eure-normandie, URL : "cas.ent27.fr")
- ENT "Mon Bureau Numérique" via EduConnect (CAS: monbureaunumerique-educonnect, URL: "cas.monbureaunumerique.fr")

*/

export type pronoteCAS =
  | "ac-orleans-tours"
  | "ac-besancon"
  | "ac-bordeaux"
  | "ac-bordeaux2"
  | "ac-caen"
  | "ac-clermont"
  | "ac-dijon"
  | "ac-grenoble"
  | "cybercolleges42"
  | "ac-lille"
  | "ac-lille2"
  | "ac-limoges"
  | "ac-lyon"
  | "atrium-sud"
  | "ac-montpellier"
  | "ac-nancy-metz"
  | "ac-nantes"
  | "ac-poitiers"
  | "ac-reims"
  | "arsene76"
  | "ac-rouen"
  | "ac-strasbourg"
  | "ac-toulouse"
  | "ac-valdoise"
  | "agora06"
  | "haute-garonne"
  | "hdf"
  | "laclasse"
  | "lyceeconnecte"
  | "monbureaunumerique"
  | "seine-et-marne"
  | "somme"
  | "portail-famille"
  | "toutatice"
  | "iledefrance"
  | "moncollege-essonne"
  | "parisclassenumerique"
  | "ljr-munich"
  | "eure-normandie"
  | "monbureaunumerique-educonnect";

export class PronoteLoginOptions {
  username: string;
  password: string;
  url: string;
  cas?: pronoteCAS;
  keepAlive?: boolean;
  constructor({
    username,
    password,
    url,
    cas,
    keepAlive,
  }: {
    username: string;
    password: string;
    url: string;
    cas?: pronoteCAS;
    keepAlive?: boolean;
  }) {
    this.username = username;
    this.password = password;
    this.url = url;
    this.cas = cas;
    this.keepAlive = keepAlive;
  }
}

export async function pronoteLogin(session: Session) {
  const { username, password, url, cas, keepAlive } =
    session.serviceLoginOptions as PronoteLoginOptions;
  const account = await login(url, username, password, cas).catch((error) => {
    if (error === _errors.WRONG_CREDENTIALS) {
      throw new WrongCredentialsError("pronote");
    }
    throw error;
  });
  account.setKeepAlive(keepAlive || false);

  switch (account.type.name) {
    case "student":
      return await new PronoteStudent(account, session).init();
    case "parent":
      throw new Error("Account type not implemented");
    case "teacher":
      throw new Error("Account type not implemented");
    case "attendant":
      throw new Error("Account type not implemented");
    case "company":
      throw new Error("Account type not implemented");
    case "administration":
      throw new Error("Account type not implemented");
    default:
      throw new Error("Unknown account type");
  }
}
