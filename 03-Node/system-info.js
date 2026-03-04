import ms from "ms"
import os from "node:os"

console.log("INFORMACION DEL SISTEMA OPERATIVO")
console.log("Tipo de SO: ", os.type())
console.log("Plataforma: ", os.platform())
console.log("Arquitectura: ", os.arch())
console.log("Memoria total (bytes): ", os.totalmem())
console.log("Memoria libre (bytes): ", os.freemem())
console.log("Directorio home del usuario", os.homedir())
console.log("Tiempo de actividad del sistema MS (segundos): ", ms(os.uptime() * 1000))
console.log("Tiempo de actividad del sistema (segundos): ", os.uptime())
console.log("CPU's: ", os.cpus())
console.log("Interfaces de red: ", os.networkInterfaces())

console.log("-----------------------------------------------")