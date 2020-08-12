document.querySelector('#add-time')
    .addEventListener('click', cloneField);

function cloneField() {
    const newScheduleItem = document.querySelector('.schedule-item').cloneNode(true);
    const newScheduleItemFields = newScheduleItem.querySelectorAll('input');

    newScheduleItemFields.forEach(field => {
        field.value = '';
    });

    document.querySelector('#schedule-items').appendChild(newScheduleItem);
}