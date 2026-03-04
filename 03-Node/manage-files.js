import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname, resolve, normalize } from "node:path";



// Usar normalize asegura que la ruta tenga el formato exacto que Node espera internamente
// const notaPath = normalize(resolve('./nota.txt'));

// const outputPath = normalize(resolve("./output"));

// console.log("Ruta exacta que Node busca:", notaPath);
// console.log("----------------------")
// const hasRead = process.permission.has("fs.read", notaPath); 
// console.log("Ruta absoluta evaluada:", notaPath);
// console.log("¿Tiene permiso?", hasRead);
// console.log("¿Tiene permiso?:", process.permission.has("fs:read", notaPath));
let content = "";


if (process.permission.has("fs.read", "nota.txt")) {
    content = await readFile("nota.txt", "utf-8")
    console.log(content)
} else {
    console.log("No tienes permiso para leer este archivo")
}

if (process.permission.has("fs.write", "output/files/documents")) {
    const outputDir = join("output", "files", "documents")
    await mkdir(outputDir, { recursive: true })

    const uppercaseContent = content.toUpperCase()
    const outputFilePath = join(outputDir, "archivo-uppercase.txt")

    console.log("Nombre del archivo: ", basename(outputFilePath))
    console.log("Extensión del archivo: ", extname(outputFilePath))

    await writeFile(outputFilePath, uppercaseContent)


    console.log("Archivo creado con contenido en mayuscula")
} else {
    console.log("No tienes permiso para escribir en este directorio especificado")
}
