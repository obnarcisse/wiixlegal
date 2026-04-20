# Wiix Legal Website

Mini-site statique destiné à être déployé séparément du projet Expo mobile.

## Contenu

- `index.html` : page d’accueil du hub légal
- `privacy.html` : politique de confidentialité
- `terms.html` : conditions d’utilisation
- `delete-account.html` : procédure publique de suppression de compte
- `site-config.js` : configuration rapide du nom, du domaine et des contacts publics
- `vercel.json` : configuration Vercel du sous-projet

## Avant mise en production

Mettez à jour `site-config.js` :

- `supportEmail`
- `deletionFormUrl` si vous avez un formulaire public

## Déploiement Vercel recommandé

1. Créer un projet Vercel pointant vers ce dépôt.
2. Définir `website` comme Root Directory.
3. Sélectionner le preset `Other`.
4. Laisser le Build Command vide pour servir les fichiers statiques tels quels.
