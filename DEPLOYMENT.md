# Guide de Déploiement - Portfolio

Ce guide vous explique comment remplacer l'ancien portfolio dans votre repository GitHub et déployer le nouveau sur Vercel.

## 📋 Prérequis

- Git installé
- Compte GitHub
- Compte Vercel (gratuit)
- Node.js et npm installés

## 🔄 Remplacer l'ancien portfolio dans GitHub

### Étape 1 : Initialiser Git dans votre projet local

```bash
# Si git n'est pas encore initialisé
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Nouveau portfolio futuriste"
```

### Étape 2 : Connecter au repository GitHub existant

```bash
# Supprimer l'ancien remote (si existant)
git remote remove origin

# Ajouter votre repository GitHub
git remote add origin https://github.com/ShedlyLaad/Portfolio_shedly.git

# Vérifier le remote
git remote -v
```

### Étape 3 : Supprimer l'ancien contenu et pousser le nouveau

⚠️ **ATTENTION** : Cette étape va supprimer TOUT le contenu de votre repository GitHub et le remplacer par le nouveau projet.

```bash
# Créer une nouvelle branche main (ou master selon votre repo)
git checkout -b main

# Forcer le push pour remplacer tout le contenu
git push -f origin main
```

**Alternative plus sûre** (recommandé) :

```bash
# Créer une branche de sauvegarde
git branch backup-old-portfolio

# Forcer le push seulement de la branche main
git push -f origin main:main

# Ou si votre branche s'appelle master
git push -f origin main:master
```

### Étape 4 : Vérifier sur GitHub

1. Allez sur https://github.com/ShedlyLaad/Portfolio_shedly
2. Vérifiez que tous les nouveaux fichiers sont présents
3. Vérifiez que l'ancien contenu a été remplacé

## 🚀 Déploiement sur Vercel

### Option 1 : Déploiement automatique (Recommandé)

1. **Connecter GitHub à Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub
   - Cliquez sur "Add New..." → "Project"

2. **Importer le repository** :
   - Sélectionnez `ShedlyLaad/Portfolio_shedly`
   - Vercel détectera automatiquement que c'est un projet Vite

3. **Configuration** (généralement automatique) :
   - **Framework Preset** : Vite
   - **Root Directory** : `./`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

4. **Variables d'environnement** (si nécessaire) :
   - Aucune variable nécessaire pour ce projet

5. **Déployer** :
   - Cliquez sur "Deploy"
   - Attendez la fin du build (2-3 minutes)
   - Votre site sera accessible via une URL Vercel

6. **Domaine personnalisé** (optionnel) :
   - Allez dans "Settings" → "Domains"
   - Ajoutez votre domaine personnalisé

### Option 2 : Déploiement manuel avec Vercel CLI

```bash
# Installer Vercel CLI globalement
npm install -g vercel

# Se connecter à Vercel
vercel login

# Déployer (dans le dossier du projet)
vercel

# Pour la production
vercel --prod
```

### Option 3 : Build local puis déploiement

```bash
# Build du projet
npm run build

# Prévisualiser localement
npm run preview

# Déployer avec Vercel CLI
vercel --prod
```

## 🔧 Configuration Vercel

Le fichier `vercel.json` est déjà configuré avec :
- ✅ Configuration Vite
- ✅ Routes SPA (Single Page Application)
- ✅ Cache des assets statiques
- ✅ Headers de performance

## 📝 Mises à jour futures

Pour mettre à jour votre portfolio après modifications :

```bash
# Faire vos modifications
# ...

# Ajouter les changements
git add .

# Commit
git commit -m "Description des modifications"

# Push vers GitHub
git push origin main
```

**Vercel déploiera automatiquement** les nouvelles versions à chaque push sur `main` !

## 🐛 Résolution de problèmes

### Erreur de build sur Vercel

1. Vérifiez les logs de build dans Vercel Dashboard
2. Testez le build localement : `npm run build`
3. Vérifiez que toutes les dépendances sont dans `package.json`

### Les assets ne se chargent pas

1. Vérifiez les chemins dans le code (doivent commencer par `/`)
2. Vérifiez que les assets sont dans `src/assets/`
3. Vérifiez le fichier `vite.config.ts` pour les alias

### Erreur 404 sur les routes

1. Le fichier `vercel.json` contient déjà la configuration des rewrites
2. Vérifiez que toutes les routes pointent vers `index.html`

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la [documentation Vercel](https://vercel.com/docs)
2. Vérifiez la [documentation Vite](https://vite.dev)
3. Consultez les logs de build dans Vercel Dashboard

---

**Bon déploiement ! 🚀**
