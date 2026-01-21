#!/bin/bash

# Script de démarrage rapide pour le portfolio
# Ce script compile le CSS Tailwind et ouvre le site dans le navigateur

echo "🚀 Démarrage du Portfolio Jean Guylane..."
echo ""

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo "✅ Dépendances installées"
    echo ""
fi

# Compiler le CSS Tailwind
echo "🎨 Compilation du CSS Tailwind..."
npm run build:css
echo "✅ CSS compilé avec succès"
echo ""

# Ouvrir le site dans le navigateur par défaut
echo "🌐 Ouverture du site dans le navigateur..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open index.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open index.html
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    start index.html
fi

echo ""
echo "✨ Portfolio prêt !"
echo ""
echo "💡 Pour le mode développement avec recompilation automatique :"
echo "   npm run watch:css"
echo ""
