const { subjects, weekdays, getSubject, convertTimeToMinutes } = require('./utils/format.js');
const Database = require('./database/db.js');

function landingPage(req, res) {
    return res.render('index.html');
}

async function studyPage(req, res) {
    const filters = req.query;

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render('study.html', { filters, subjects, weekdays });
    }

    const timeInMinutes = convertTimeToMinutes(filters.time);

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeInMinutes}
            AND class_schedule.time_to > ${timeInMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `;

    try {
        const db = await Database
        const proffys = await db.all(query);

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject);
        });

        return res.render('study.html', { proffys, filters, subjects, weekdays });

    } catch (error) {
        console.log(error);
    }
}

function giveClassesPage(req, res) {
    return res.render('give-classes.html', { weekdays, subjects });
}

function successPage(req, res) {
    const subject = req.query.subject;
    const weekday = req.query.weekday;
    const [hour, minutes] = req.query.time.split(':');
    const time = `${hour}:${minutes}`;

    res.render('success.html', { subject, weekday, time });
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy.js');
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertTimeToMinutes(req.body.time_from[index]),
            time_to: convertTimeToMinutes(req.body.time_to[index])
        }
    });

    try {
        const db = await Database;
        await createProffy(db, { proffyValue, classValue, classScheduleValues });
        
        let queryString = `?subject=${req.body.subject}`;
        queryString += `&weekday=${req.body.weekday[0]}`;
        queryString += `&time=${req.body.time_from[0]}`

        return res.redirect(`/success${queryString}`);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    landingPage,
    studyPage,
    giveClassesPage,
    saveClasses,
    successPage
}