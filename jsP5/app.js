class Course {
    constructor(title, instructor, image) {
        this.courseId = Math.floor(Math.random() * 1000000);
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
                <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
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
            return true;
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

        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000)
    }
}

class Storage {

    static getCourses() {
        let courses;
        if (localStorage.getItem('courses') === null) {
            courses = [];
        } else {
            courses = JSON.parse(localStorage.getItem('courses'));
        }

        return courses;
    }

    static displayCourses() {
        const courses = Storage.getCourses();
        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course)
        });
    }

    static addCourse(course) {
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    static deleteCourseLS(element) {
        if (element.classList.contains('delete')) {
            const id = element.getAttribute('data-id');
            const courses = Storage.getCourses();
            courses.forEach((course, index) => {
                if (course.courseId == id);
                courses.splice(index, 1);
            });
            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }
}

document.addEventListener('DOMContentLoaded', Storage.displayCourses);

document.getElementById('new-course').addEventListener('submit', e => {

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    const course = new Course(title, instructor, image, );


    const ui = new UI();
    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('Please compete the form', 'warning');
    } else {
        ui.addCourseToList(course);
        Storage.addCourse(course);
        ui.clearList();
        ui.showAlert('Course has been added', 'success');
    }
    e.preventDefault();
})

document.getElementById('course-list').addEventListener('click', e => {
    const ui = new UI();
    if (ui.deleteCourse(e.target) == true) {
        Storage.deleteCourseLS(e.target);
        ui.showAlert('Course has been deleted', 'danger');
    }
});