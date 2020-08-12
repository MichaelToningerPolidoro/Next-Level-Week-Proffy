function getSubject(subjectIndex) {
    const index = +subjectIndex -1;
    return subjects[index];
}

function convertTimeToMinutes(time) {
    const [hour, minutes] = time.split(':');
    return Number(Number(hour) * 60 + Number(minutes));
}

const subjects = [
    'Artes', 'Biologia', 'Ciências',
    'Educação física', 'Física', 'Geografia',
    'História', 'Matemática', 'Português',
    'Química'
];

const weekdays = [
    'Domingo', 'Segunda-feira',
    'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira',
    'Sábado'
];

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertTimeToMinutes
}