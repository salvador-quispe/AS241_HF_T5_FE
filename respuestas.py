import json
import matplotlib
# Configuración de backend estable para entornos de escritorio / VS Code
matplotlib.use('TkAgg') 
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import re

# =================================================================
# 1. CAPA DE DATOS (Carga estándar del CSV)
# =================================================================
archivo_csv = "Habilidades Profesionales (respuestas) - DATA_TRABAJO.csv"
df = pd.read_csv(archivo_csv)

df.columns = df.columns.str.strip()
total_general_encuestados = len(df)

columna_pregunta = "¿Qué habilidades consideras que necesitas mejorar?"
if columna_pregunta not in df.columns:
    columna_pregunta = df.columns[27]

# =================================================================
# 2. CONFIGURACIÓN SEMÁNTICA ESCALABLE (Orden de Prioridad Estricto)
# =================================================================
PATRONES_SISTEMA = {
    "Lógica y Algoritmia (Seudocódigo/Flujograma)": 
        r"logica|lógica|seudocó|pseudocó|flujograma|algorit",
        
    "Bases de Datos y Análisis (SQL/Sheets)": 
        r"base de datos|bases de datos|sql|mysql|sheets|excel|herramientas avanzadas",
        
    "Refuerzo General y Práctica Constante": 
        r"seguir practicando|todo de la carrera|practica constante|practca constante|carrera",
        
    "Desarrollo Frontend (HTML/CSS)": 
        r"html|css|sitios web|frontend|oaginas|paginas",
        
    "Arquitectura, Backend y DevOps (Docker)": 
        r"arquitectura|backend|docker|kubernetes|distribuid|proyectos backend",
        
    "Infraestructura, Redes y AWS": 
        r"aws|visual estudio|redes|ciberseguridad",
        
    "Programación y Código General": 
        r"programac|cód|cod|lenguaje|memoriz|versiones|implementar|tecnic|digital|programas"
}

# =================================================================
# 3. MOTOR MUTUAMENTE EXCLUYENTE (Garantiza 1 Voto por Alumno)
# =================================================================

def clasificador_excluyente_automatico(texto_usuario, patrones):
    if pd.isna(texto_usuario):
        return None
        
    texto_limpio = str(texto_usuario).lower().strip().replace('\n', ' ')
    texto_limpio = " ".join(texto_limpio.split())
    
    # El primero que coincida se queda con el voto y rompe el ciclo (Mutuamente excluyente)
    for categoria, patron in patrones.items():
        if re.search(patron, texto_limpio):
            return categoria
            
    return None

# Aplicamos la clasificación limpia sobre la serie de Pandas
df['Categoria_Asignada'] = df[columna_pregunta].apply(lambda x: clasificador_excluyente_automatico(x, PATRONES_SISTEMA))

# Filtrar solo el universo de alumnos identificados
df_mapeados = df[df['Categoria_Asignada'].notna()]
alumnos_mapeados_totales = len(df_mapeados)

# =================================================================
# 4. AGREGACIÓN DINÁMICA DE PORCENTAJES
# =================================================================
conteos_series = df_mapeados['Categoria_Asignada'].value_counts()

lista_resultados = []
for cat in PATRONES_SISTEMA.keys():
    votos = int(conteos_series.get(cat, 0))
    pct = round((votos / alumnos_mapeados_totales) * 100, 1) if alumnos_mapeados_totales > 0 else 0
    lista_resultados.append({
        "categoria": cat,
        "votos": votos,
        "porcentaje_del_subtotal": pct
    })

# Ordenar de mayor a menor volumen de alumnos
lista_resultados = sorted(lista_resultados, key=lambda x: x['votos'], reverse=True)
porcentaje_global = round((alumnos_mapeados_totales / total_general_encuestados) * 100, 1)

# =================================================================
# 5. PIPELINE DE EXPORTACIÓN (JSON PARA REACT)
# =================================================================
json_final = {
    "resumen_global": {
        "total_encuestados": total_general_encuestados,
        "total_mapeados": alumnos_mapeados_totales,
        "porcentaje_impacto_global": porcentaje_global
    },
    "subcategorias_tecnicas": lista_resultados
}

with open("datos_tecnicos_react.json", "w", encoding="utf-8") as f:
    json.dump(json_final, f, ensure_ascii=False, indent=4)

print("==================================================================")
print(f"¡SISTEMA AUTOMÁTICO ESCALABLE!")
print(f"Total Alumnos Mapeados Dinámicamente: {alumnos_mapeados_totales} (Suma exacta certificada)")
print("==================================================================")


# =================================================================
# 6. PIPELINE DE VISUALIZACIÓN DINÁMICA
# =================================================================
df_pie = pd.DataFrame(lista_resultados)
colores_base = ['#0f172a', '#1d4ed8', '#38bdf8', '#10b981', '#f59e0b', '#f97316', '#cbd5e1']

fig, ax = plt.subplots(figsize=(12, 7), facecolor="#fafafa")
ax.set_facecolor("#ffffff")

wedges, texts = ax.pie(
    df_pie["votos"], 
    colors=colores_base[:len(df_pie)], 
    startangle=90, 
    wedgeprops=dict(width=0.35, edgecolor='#ffffff', linewidth=3),
    pctdistance=0.85
)

# Render del texto del centro de la dona
ax.text(
    0, 0, f"{alumnos_mapeados_totales}\nAlumnos\nMapeados\n({porcentaje_global}%)", 
    ha='center', va='center', fontsize=13, weight='black', color='#1e293b'
)

etiquetas_leyenda = [f"{row['porcentaje_del_subtotal']}%   {row['categoria']}  ({row['votos']} Alum.)" for _, row in df_pie.iterrows()]

ax.legend(
    wedges, etiquetas_leyenda,
    title="DESGLOSE OPERACIONAL AUTOMÁTICO (MUTUALLY EXCLUSIVE)",
    title_fontproperties={'weight': 'bold', 'size': 11},
    loc="center left", bbox_to_anchor=(1, 0, 0.5, 1),
    frameon=True, facecolor="#ffffff", edgecolor="#e2e8f0",
    labelspacing=1.1, borderpad=1.2
)

plt.title("MATRIZ OPERACIONAL DE REQUERIMIENTOS - ENGINE V3.1", fontsize=12, loc="left", pad=20, color="#0f172a", weight="bold")
plt.tight_layout()
plt.show(block=True)