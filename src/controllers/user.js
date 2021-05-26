const controller = {}

const pool = require('../config/db')
const helper = require('../lib/helpers')

controller.index = (req, res)=>{
    res.render('index', {
        title: 'Ventana de inicio'
    })
}

// NOTE: Settings controllers
controller.settings = async (req, res)=>{
    try {
        const teachers = await pool.query('SELECT * FROM teacher')
        console.log(teachers);
        res.render('settings', {
            title: 'Configuración',
            teachers
        })
    } catch (e) {

    }
}

// NOTE: Report controllers
controller.report = async (req, res)=>{
    try {
        const teachers = await pool.query('SELECT teacher.ID, teacher.Name, teacher.Field, subject.Name AS subjectName FROM  teacher JOIN subject JOIN teacher_subject ON teacher_subject.teacherID = teacher.ID')
        if(teachers.length){
            console.log(teachers.map(i=>i.ID));
            res.render('report', {
                title: 'Reportar',
                teachers
            })
        }else{
            console.log('No se encontro nada');
            res.send('No se encontro nada')
        }

    } catch (error) {
        console.log(`Error en =>>> ${error.message} <<<`);
    }

}

controller.addReport = async (req, res)=>{
    try {
        const {id} = req.params
        const {textReport} =req.body
        if(id.trim() === 'noID' || !textReport.trim() ){
            req.flash('message', 'No deje campos vacios')
            res.redirect('/report')
        }else{
            const response = await pool.query('SELECT teacherID, Name FROM teacher_subject JOIN subject on teacher_subject.teacherID = ? ', [id])
            let date = new Date()
            let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
            console.log(textReport.length)
            if(response.length > 0){
                await pool.query('INSERT INTO report values(report_ID, ?, ?, ?, ?)', [response[0].Name, time, textReport, response[0].teacherID])
                req.flash('message', 'Reporte agregado.')
                res.redirect('/report')
            }else{
                req.flash('message', 'Ups, parece que este maestro no tiene una meteria asignada')
                res.redirect('/report')
            }
        }

    } catch (error) {
        req.flash('message', 'Ha ocurrido algún error al intentar agregar un reporte')
        res.redirect('/report')
        console.log(`ERROR =>>> ${error.message} <<<`);
    }
}

controller.dashboard =  (req, res)=>{
        res.render('dashboard',{title:'Dashboard'})
    // try {
    //     const response = await pool.query('SELECT * , COUNT(teacherID) FROM report JOIN teacher ON teacher.ID = teacherID GROUP BY teacherID HAVING COUNT(teacherID)>1')
    //     console.log(response)
    //     res.render('dashboard',{title:'Dashboard'})
    // } catch (e) {
    // }
}

controller.getData = async (req, res)=>{
    try {
        const response = await pool.query('SELECT * , COUNT(teacherID) AS repeated FROM report JOIN teacher ON teacher.ID = teacherID GROUP BY teacherID HAVING COUNT(teacherID)>0')
        res.send(response)
    } catch (e) {
        res.json({Error:'Ups, ha habido un error'})
    }
}

controller.teacher = async (req, res)=>{
    try {
        let teacherArr = []

        // NOTE: Bring all teacher with subject assign and
        const  teachers = await pool.query('SELECT teacher.ID, teacher.Name, teacher.Field, subject.Name AS subjectName FROM  teacher JOIN teacher_subject ON teacher_subject.teacherID = teacher.ID JOIN subject ON subject.subject_ID = teacher_subject.subjectID')

        // NOTE: Bring all teachers wwithout no subject assing
        const nosubject = await pool.query('SELECT * FROM teacher WHERE teacher.ID NOT IN (SELECT teacher_subject.teacherID FROM teacher_subject)')
        const subjects = await pool.query('SELECT * FROM subject')
        if(teachers.length > 0 || nosubject.length > 0){
            teacherArr = [...teachers, ...nosubject]// NOTE: save bot results on one
            // NOTE: Sort array by name
            helper.sortArrByName(teacherArr)

            console.log(teacherArr.length > 0);
            res.render('teacher',{
                title:'Configuración de maestros',
                teacherArr,
                subjects
            })
        }else{
            console.log('No se encontraron maestros');
        }
        // if(teachers.length > 0 || nosubject.length > 0){
        //     res.render('teacher',{
        //         title:'Configuración de maestros',
        //         teachers,
        //         nosubject
        //     })
        // }else{
        //     console.log('No se encontro nada');
        // }
    } catch (e) {
        console.log(`Error =>> ${e.message}`);
    } finally {

    }

}

controller.addTeacher = async (req, res)=>{
    try {
        const {name, field} = req.body
        const validTeacher = await pool.query('SELECT ID FROM teacher WHERE Name = ?', [name])
        if(validTeacher.length > 0){
            req.flash('message', 'Este maestro ya está registrado')
            res.redirect('/teacher')
        }else{
            await pool.query('INSERT INTO teacher VALUES(ID, ?, ?, "") ', [name, field])
            req.flash('message', 'Maestro agregado correctamente')
            res.redirect('/teacher')
        }
    } catch (e) {
            console.log(`Ups, un error =>>>> ${e.message}`);
    }
}

// NOTE: Assign or modify the subject of a teacher
controller.assignSubject = async (req, res)=>{
    try {
        const {subject} = req.body
        const {id} = req.params

        if(subject.trim().length > 0 && id >= 1){
            // const idSubject = await pool.query('SELECT subject_ID FROM subject WHERE subject_ID = ?', [subject])
            // res.send(idSubject)
            await pool.query('INSERT INTO teacher_subject VALUES(ID, ?, ?)', [id, subject])
            req.flash('message', `Se asigno una clase`)
            res.redirect('/teacher')
        }else{
            req.flash('message', 'Seleccione una materia')
            res.redirect('/teacher')
        }
    } catch (e) {
        log(`Error =>>> ${e.message}`)
    }
}

controller.editTeacher = async (req, res)=>{
    try {
        const {name, field} = req.body
        const {id} = req.params
        if(name.trim().length > 0 && field.trim().length > 0){
            await pool.query('UPDATE teacher SET Name = ?, Field = ? WHERE ID = ?', [name, field, id])
            req.flash('message', 'El maestro ha sido modificado')
            res.redirect('/teacher')
        }else{
            req.flash('message', 'No deje campos vacios')
            res.redirect('/teacher')
        }
    } catch (e) {
        console.log(`Ha habido un error =>>> ${e.message}`);
    }
}


// NOTE: Subject controller

controller.subject = async (req, res)=>{
    try {
        subjects = await pool.query('SELECT * FROM subject');
        if(subjects.length > 0){
            res.render('subject',{
                title:'Configuración de materia',
                subjects
            })
        }else{
            res.render('subject',{
                title:'Configuración de materia',
                subjects: 0
            })
        }
    } catch (e) {
        console.log(`Ha ocurridoun error =>> ${e.message}`);
    }
}

controller.addSubject = async (req, res)=>{
    try {
        const {subject} = req.body
        console.log(subject);
        if(subject.trim().length > 0){
            await pool.query('INSERT INTO subject VALUES(subject_ID, ?)', [subject])
            req.flash('message', 'Se ha agregado una materia nueva')
            res.redirect('/subject')
        }else{
            req.flash('message', 'No deje el campo vacio')
            res.redirect('/subject')
        }
    } catch (e) {

    }
}

module.exports = controller
