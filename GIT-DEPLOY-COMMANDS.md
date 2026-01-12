# 🚀 Commandes pour remplacer l'ancien portfolio et déployer

## Étape 1 : Initialiser Git (si pas déjà fait)

```bash
git init
```

## Étape 2 : Ajouter tous les fichiers au staging

```bash
git add .
```

## Étape 3 : Faire le premier commit

```bash
git commit -m "feat: Nouveau portfolio futuriste avec React + Vite"
```

## Étape 4 : Connecter au repository GitHub

```bash
# Supprimer l'ancien remote (si existant)
git remote remove origin

# Ajouter votre repository GitHub
git remote add origin https://github.com/ShedlyLaad/Portfolio_shedly.git

# Vérifier que le remote est bien configuré
git remote -v
```

## Étape 5 : Créer la branche main et pousser (remplace TOUT le contenu)

⚠️ **ATTENTION** : Cette commande va supprimer TOUT le contenu de votre repository GitHub et le remplacer par le nouveau projet.

```bash
# Créer la branche main
git branch -M main

# Pousser et remplacer tout le contenu existant
git push -f origin main
```

**OU** si votre repository utilise `master` au lieu de `main` :

```bash
# Pousser vers master
git push -f origin main:master
```

## Étape 6 : Vérifier sur GitHub

1. Allez sur : https://github.com/ShedlyLaad/Portfolio_shedly
2. Vérifiez que tous les nouveaux fichiers sont présents
3. Vérifiez que l'ancien contenu a été remplacé

## 🎯 Déploiement sur Vercel

### Option A : Via l'interface web Vercel (Recommandé)

1. **Allez sur [vercel.com](https://vercel.com)** et connectez-vous avec GitHub

2. **Cliquez sur "Add New..." → "Project"**

3. **Importez votre repository** :
   - Sélectionnez `ShedlyLaad/Portfolio_shedly`
   - Vercel détectera automatiquement Vite

4. **Configuration** (généralement automatique) :
   - ✅ Framework Preset : **Vite**
   - ✅ Root Directory : `./`
   - ✅ Build Command : `npm run build`
   - ✅ Output Directory : `dist`
   - ✅ Install Command : `npm install`

5. **Cliquez sur "Deploy"** et attendez 2-3 minutes

6. **Votre site sera en ligne** avec une URL Vercel (ex: `portfolio-shedly.vercel.app`)

### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI globalement
npm install -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

## 📝 Commandes pour les futures mises à jour

Quand vous modifiez votre portfolio :

```bash
# Ajouter les changements
git add .

# Commit avec message descriptif
git commit -m "Description des modifications"

# Push vers GitHub
git push origin main
```

**Vercel déploiera automatiquement** la nouvelle version ! 🎉

## 🔍 Vérifier le build localement

Avant de pousser, testez toujours le build localement :

```bash
# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## ✅ Résumé rapide

```bash
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Premier commit
git commit -m "feat: Nouveau portfolio futuriste"

# 4. Ajouter le remote GitHub
git remote add origin https://github.com/ShedlyLaad/Portfolio_shedly.git

# 5. Pousser et remplacer l'ancien contenu
git branch -M main
git push -f origin main

# 6. Aller sur vercel.com et importer le repository
```

## 🎉 C'est fait !

Votre nouveau portfolio est maintenant :
- ✅ Sur GitHub
- ✅ Prêt à être déployé sur Vercel
- ✅ Optimisé et prêt pour la production

---

**Bon déploiement ! 🚀**
