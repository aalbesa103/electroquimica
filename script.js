// Constantes
const FARADAY = 96485; // Constante de Faraday (C/mol)

// Datos de las sustancias (Masa Molar en g/mol, Electrones transferidos z)
// Basado en los problemas del PDF [cite: 11, 13, 24, 25, 26]
const sustancias = {
    'Cu': { nombre: 'Cobre (Cu²⁺)', masaMolar: 63.55, z: 2 },
    'Mg': { nombre: 'Magnesio (Mg²⁺)', masaMolar: 24.31, z: 2 }, // [cite: 13]
    'Fe': { nombre: 'Hierro (Fe²⁺)', masaMolar: 55.85, z: 2 },   // [cite: 25]
    'Al': { nombre: 'Aluminio (Al³⁺)', masaMolar: 26.98, z: 3 }, // [cite: 24]
    'Au': { nombre: 'Oro (Au³⁺)', masaMolar: 196.97, z: 3 }    // [cite: 26]
    // Añadir más sustancias si es necesario
};

function calcularMasa() {
    // Obtener elementos del DOM
    const inputCorriente = document.getElementById('corriente');
    const inputTiempo = document.getElementById('tiempo');
    const selectSustancia = document.getElementById('sustancia');
    const divResultado = document.getElementById('resultado');
    const divError = document.getElementById('error');

    // Limpiar resultados y errores anteriores
    divResultado.textContent = '';
    divError.textContent = '';

    // Obtener valores y validar
    const I = parseFloat(inputCorriente.value); // Corriente en Amperios
    const t = parseFloat(inputTiempo.value);     // Tiempo en segundos
    const keySustancia = selectSustancia.value;

    if (isNaN(I) || I <= 0) {
        divError.textContent = 'Por favor, introduce una corriente válida (número positivo).';
        return;
    }
    if (isNaN(t) || t <= 0) {
        divError.textContent = 'Por favor, introduce un tiempo válido (número positivo en segundos).';
        return;
    }
    if (!sustancias[keySustancia]) {
        divError.textContent = 'Sustancia seleccionada no válida.';
        return;
    }

    // Obtener datos de la sustancia seleccionada
    const sustancia = sustancias[keySustancia];
    const M = sustancia.masaMolar; // Masa molar
    const z = sustancia.z;         // Electrones transferidos por ion

    // Calcular Carga Total (Q = I * t)
    const Q = I * t; // Coulombs

    // Calcular moles de electrones (moles_e = Q / F)
    const molesElectrones = Q / FARADAY;

    // Calcular moles de metal depositado (moles_metal = moles_e / z)
    const molesMetal = molesElectrones / z;

    // Calcular masa de metal depositado (masa = moles_metal * M)
    const masaDepositada = molesMetal * M;

    // Mostrar el resultado
    divResultado.textContent = `Masa de ${sustancia.nombre} depositada: ${masaDepositada.toFixed(4)} gramos`;
}
