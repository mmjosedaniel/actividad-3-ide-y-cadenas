import React from "react";
import { useCallback, useEffect, useState } from "react";

/*
1.1
Investigar sobre las excepciones en java, Excepción ( Exthrows, try ,catch,
ArithmeticException)

Las exepciones en cualquier lenguaje de programación son la forma de controlar
el flujo en caso de que se presenten errores.

Cuando se usa la palabra throw se usa dentro de un condicional en los casos en
los que se presenta un evento que el programador reconoce como error.

Try, catch y finally son bloques con los que se maneja la ejecucion de un
código para controlar el momento en el que se presenta un error.
	- Dentro de el bloque **try** se escribe el código que se desea ejecutar.
	- En el bloque **catch** se define qué se desea hacer en el caso de que ocurra un
		error durante la ejecución del codigo try.
	-	el boque **finally** es un boque de codigo que se ejecutará siempre; haya o no
		haya error.

	ArithmeticException: esto es una excepción aritmetica, ocurre cuando una operación
	aritmetica no se puede llevar a cabo, como ejemplo una división por 0.

	Henao, C. A. J. (2017). Desarrollo de software 1. Uniremington.
	gitbook. (2020). Exception Handling. gitbook. https://basarat.gitbook.io/typescript/type-system/exceptions
*/

interface Estudiante {
  nombre: string;
  parcial1: number;
  parcial2: number;
  seguimiento: number;
  coevaluacion: number;
	nota: number;
	puntosFaltantes: number;
	porcentajeFaltante: number;
}

const Ejercico1 = () => {
	const[estudiantes, setEstudiantes] = useState<Estudiante[]>([])
	const PORCENTAJE_PARCIAL_1 = 0.2; // 20%
	const PORCENTAJE_PARCIAL_2 = 0.2; // 20%
	const PORCENTAJE_SEGUIMIENTO = 0.3; // 30%
	const PORCENTAJE_COEVALUACION = 0.1; // 10%

	// 1.2 -
	const obtenerDatosEstudiante = useCallback((): Estudiante  => {
		const nombre = prompt("Ingrese el nombre del estudiante:", "") || "";
		console.log({nombre});

		const parcial1 = getValor("Ingrese la calificación del parcial 1:");
		const parcial2 = getValor("Ingrese la calificación del parcial 2:");
		const seguimiento = getValor("Ingrese la calificación del seguimiento:");
		const coevaluacion = getValor("Ingrese la calificación de coevaluación:");

		const nota = 
			parcial1 * PORCENTAJE_PARCIAL_1 +
			parcial2 * PORCENTAJE_PARCIAL_2 +
			seguimiento * PORCENTAJE_SEGUIMIENTO +
			coevaluacion * PORCENTAJE_COEVALUACION;

		const puntosFaltantes = nota < 3 ? 3 - nota : 0 
		
		const porcentajeFaltante = nota < 3 ? (puntosFaltantes * 100) / 5  : 0

		return {
			nombre,
			parcial1,
			parcial2,
			seguimiento,
			coevaluacion,
			nota,
			puntosFaltantes,
			porcentajeFaltante
		};
	}, []);
	
	
	function getValor(mensaje: string): number {
		const valor = parseFloat(prompt(mensaje, "0") || "0");
		console.log({valor});

		if(valor < 0 || valor > 5) {
			throw new Error("El número ingresado es menor 0 o mayor a 5");
		}
		if(Number.isNaN(valor)) {
			throw new Error("El valor ingresado no es un número");
		}	
		
		return valor;
	} 

	useEffect(() => {
		try {
			for(let i = 0; i < 5; i++){
					const nuevoEstudiante = obtenerDatosEstudiante()!;
					setEstudiantes(prevVal => [...prevVal, nuevoEstudiante]);
			}
		} catch(error) {
			console.log(error);
		}
	},[obtenerDatosEstudiante]);

	return (
		<div>
			{estudiantes.map(estudiante =>(
				<div>
					<h3>Notas: {estudiante.nombre}</h3>
					<ul>
						<li>Parcial 1: {estudiante.parcial1}</li>
						<li>Parcial 2: {estudiante.parcial2}</li>
						<li>Seguimiento: {estudiante.seguimiento}</li>
						<li>Coevaluación: {estudiante.coevaluacion}</li>
					</ul>

					<p>
						La nota del estudiante es {estudiante.nota}, 
						le faltan {estudiante.puntosFaltantes} puntos para aprobar la materia
						que representan el {estudiante.porcentajeFaltante}% del total de la nota.
					</p>

					<br />
				</div>
			))}
		</div>
	);
} 

export default Ejercico1;
