class Course {
    constructor(title, instructor, image) {
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

class UI {

    addCourseToList(course) {
        const list = document.getElementById('course-list');
        const html = `
            <tr>
                <td><img src="img/${course.image}"></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
            </tr>
        `;
        list.innerHTML += html;

    }
    clearList() {
        const title = document.getElementById('title').value = '';
        const instructor = document.getElementById('instructor').value = '';
        const image = document.getElementById('image').value = '';
    }
    deleteCourse(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    showAlert(message, className) {
        const row = document.querySelector('.row');
        const alert = `
            <div class="alert alert-${className}">
            ${message}
            </div>
        `;
        row.insertAdjacentHTML('beforebegin', alert);
    }
}

class Storage{

    static getCourse(){

    }

    static displayCourses(){

    }

    static addCourse(course){

    }

    static deleteCourseLS(){

    }
}

document.addEventListener('DOMContentLoaded',Storage.displayCourses);

document.getElementById('new-course').addEventListener('submit', e => {

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    const course = new Course(title, instructor, image);

    const ui = new UI();
    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('Please compete the form', 'warning');
    } else {
        ui.addCourseToList(course);
        ui.clearList();
        Storage.addCourse();
        ui.showAlert('Course has been added', 'success');
    }
    e.preventDefault();
})

document.getElementById('course-list').addEventListener('click', e => {
    const ui = new UI();
    ui.deleteCourse(e.target);
    Storage.deleteCourse();
    ui.showAlert('Course has been deleted', 'danger');
});