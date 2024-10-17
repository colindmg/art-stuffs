#!/bin/bash

# Convertir chaque fichier PNG et JPEG en WebP et supprimer l'original
for file in *.png *.jpeg *.jpg; do
    # Vérifier si le fichier existe
    if [ -f "$file" ]; then
        # Créer le nom du nouveau fichier WebP
        webp_file="${file%.*}.webp"

        # Convertir PNG ou JPEG en WebP
        cwebp "$file" -o "$webp_file" -q 100

        # Si la conversion réussit, supprimer le fichier d'origine
        if [ $? -eq 0 ]; then
            rm "$file"
        fi
    fi
done