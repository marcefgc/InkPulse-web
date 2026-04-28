"""
embed-logos.py — InkPulse PSA Beta Program
Ejecutá este script UNA vez desde la carpeta beta-program/.
Embebe logo-full.png y logo-icon.png como base64 en los 3 HTML
para que funcionen sin depender de archivos externos.

Requiere Python 3 (ya viene instalado en Windows 10/11).
Ejecutar: doble clic en el archivo, o desde terminal:
    python embed-logos.py
"""

import base64
import os
import re

FOLDER = os.path.dirname(os.path.abspath(__file__))

FILES_TO_PATCH = [
    "psa-beta-onepager.html",
    "psa-beta-outreach-kit.html",
    "psa-beta-feedback-form.html",
]

# Mapea: nombre_real_en_disco -> lista de src que reemplaza en los HTML
# psa-logo.png reemplaza cualquier referencia vieja (logo-full, logo-icon, o sí misma)
LOGOS = {
    "psa-logo.png": ["logo-full.png", "logo-icon.png", "psa-logo.png"],
}

def to_data_uri(disk_filename):
    path = os.path.join(FOLDER, disk_filename)
    if not os.path.exists(path):
        print(f"  ⚠  No encontré {disk_filename} — asegurate de que esté en la misma carpeta.")
        return None
    with open(path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")
    return f"data:image/png;base64,{b64}"

def patch_file(filename, replacements):
    """replacements: { src_viejo_o_prefijo_data_uri: nuevo_data_uri }"""
    path = os.path.join(FOLDER, filename)
    if not os.path.exists(path):
        print(f"  ⚠  No encontré {filename}")
        return False
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    original = content
    for old_src, new_uri in replacements.items():
        # Reemplazar referencias por nombre de archivo
        content = content.replace(f'src="{old_src}"', f'src="{new_uri}"')
    # También reemplazar cualquier base64 antiguo (src="data:image/png;base64,...)
    import re
    content = re.sub(
        r'src="data:image/png;base64,[^"]*"',
        f'src="{list(replacements.values())[0]}"',
        content
    )
    if content == original:
        print(f"  ℹ  {filename} — sin cambios detectados")
        return False
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return True

def main():
    print("\n InkPulse — embed-logos.py")
    print(" ─────────────────────────────")

    # Construir data URIs
    replacements = {}
    for disk_name, src_names in LOGOS.items():
        uri = to_data_uri(disk_name)
        if uri:
            kb = len(uri) // 1024
            print(f"  ✓  {disk_name} → base64 ({kb} KB)")
            for src in src_names:
                replacements[src] = uri
        else:
            print(f"  ✗  No se pudo convertir {disk_name}")

    if not replacements:
        print("\n  No se pudo convertir ningún logo. Revisá que los PNG estén en la misma carpeta.")
        input("\n  Presioná Enter para cerrar...")
        return

    print()

    # Parchear cada HTML
    for html_file in FILES_TO_PATCH:
        changed = patch_file(html_file, replacements)
        status = "✓  Actualizado" if changed else "–  Sin cambios"
        print(f"  {status}: {html_file}")

    print("\n  ✅ Listo! Abrí los HTML en el browser — los logos deberían verse correctamente.")
    print("  (Podés borrar este script y los PNG de la carpeta si querés, ya no son necesarios.)\n")
    input("  Presioná Enter para cerrar...")

if __name__ == "__main__":
    main()
