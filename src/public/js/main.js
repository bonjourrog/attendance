const links = document.querySelectorAll('.links')
const popup = document.querySelectorAll('.popup')
const sidebar_opc = document.querySelectorAll('.sidebar-opc')
const teachers = document.getElementsByClassName('teacher-cont')
const teacher_selected = document.getElementById('teacher-selected')

const urlId = document.getElementById('form')

for (let i = 0; i < sidebar_opc.length; i++) {
    sidebar_opc[i].addEventListener('mouseenter', ()=>{
        const text = sidebar_opc[i].alt.substr(0, sidebar_opc[i].alt.length -5)
        popup[i].innerHTML = text
        popup[i].style.display ='block'
        // links[i].innerHTML += `<span class="popup">${text}</span>`
    })

    sidebar_opc[i].addEventListener('mouseleave', ()=>{
        popup[i].style.display='none'
    })
}

for (let i = 0; i < teachers.length; i++){
    teachers[i].addEventListener('click', ()=>{
        teacher_selected.innerHTML = teachers[i].children[0].innerHTML
        urlId.setAttribute('action', `/report/${teachers[i].children[0].getAttribute('value')}`)
    })
}


// NOTE: Add teacher form
const addTeacherForm = document.getElementById('add-teacher-form')
const addTeacher = document.getElementById('add-teacher')
const closeAddTeacherForm = document.getElementById('close-add-teacher-form')
addTeacher.addEventListener('click', ()=>{
    addTeacherForm.style.display = 'flex';
})

closeAddTeacherForm.addEventListener('click', ()=>{
    addTeacherForm.style.display = 'none';
})


const table = document.getElementById('table')
table.onload = assignSubjectForm()
// NOTE: const showSubjectform
function assignSubjectForm(){
    const opc = document.getElementsByClassName('opc')

    const message = document.getElementById('message')
    if(message != null){
        message.addEventListener('mouseenter', ()=>{
            message.style.display='none'
        })

        setTimeout(()=>{
            message.style.display='none'
        },2600)
    }

    const closePopUp = document.getElementById('closePopUp') // NOTE: Get the span tag with the X
    const subjectForm = document.getElementById('subjectForm')
    const withoutSubject = document.getElementsByClassName('withoutSubject')

    const editTeacherForm = document.getElementById('edit-teacher-form') // NOTE: Form of edit teacher
    const editTeacher = document.getElementsByClassName('edit-teacher') // NOTE: edit teacher button
    const closeEditTeacherForm = document.getElementById('close-edit-teacher-form')// NOTE: CLose edit form button
    const nameTeacherInput = document.getElementById('name') // NOTE: name teacher input
    const fieldTeacherInput = document.getElementById('field') // NOTE: field teacher input
    const idTeahcer = document.getElementById('set-id-teacher')

    for (let i = 0; i < withoutSubject.length; i++) {
        withoutSubject[i].addEventListener('click', ()=>{


            subjectForm.style.display = 'flex'
            const val = withoutSubject[i].getAttribute('value')
            subjectForm.setAttribute('action',`/assignSubject/${val}`)
        })
    }

    closePopUp.addEventListener('click', ()=>{
        subjectForm.style.display = 'none'
        subjectForm.setAttribute('action',`/assignSubject/0`)
    })

    // NOTE: Show edit teacher Form
    for (let i = 0; i < editTeacher.length; i++) {
        editTeacher[i].addEventListener('click', ()=>{
            console.log(editTeacher[i]);
            const teacherName = editTeacher[i].getAttribute('data-name')
            const teacherField = editTeacher[i].getAttribute('data-field')
            const teacherID = editTeacher[i].getAttribute('data-id')
            nameTeacherInput.setAttribute('value', teacherName)
            fieldTeacherInput.setAttribute('value', teacherField)
            editTeacherForm.style.display = 'flex'
            idTeahcer.setAttribute('value', teacherID)
            editTeacherForm.setAttribute('action', `/editteacher/${teacherID}`)
        })
    }
    closeEditTeacherForm.addEventListener('click', ()=>{
        editTeacherForm.style.display = 'none'
    })
}
