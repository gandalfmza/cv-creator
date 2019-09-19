export function isNumber(value) {
	return /^\d+$/g.test(value) ?
		'' :
		'Este campo recibe solo números';
}

export function isPhone(value) {
	return /[\d-() +]+/g.test(value) ?
		'' :
		'Ingresá un teléfono válido';
}

export function isRequired(value) {
	return /^(?=\s*\S).*$/g.test(value) ?
		'' :
		'Este campo es requerido';

}

export function maxLength(value, number) {
	return /^.{6,7}$/.test(value) ?
		'' :
		'Este campo solo recibe una cantidad limitada de caracteres';

}

export function isEmail(value) {
	return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
		'' :
		'Ingresá un correo electrónico válido';

}

export function isDate(value) {
	return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{2}$/.test(value) ?
		'' :
		'Ingresá una fecha válida';

}

export function isChecked(value) {
	return /^\d+$/g.test(value) ?
		'' :
		'Debe seleccionar alguna de las opciones disponibles';

}