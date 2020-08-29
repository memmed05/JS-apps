const profile = new Profile();
const ui = new UI();
const searchProfile = document.querySelector('#searchProfile');

searchProfile.addEventListener('keyup', (event) => {
    ui.clear();
    let text = event.target.value;
    if (text !== '') {
        profile.getProfile(text).then((result) => {
            if (result.profile.length !== 0) {
                ui.showProfille(result.profile[0])
                ui.showTodo(result.todo)
            } else {
                ui.showAlert(text);
            }
        }).catch(err => {
            ui.showAlert(text);
        });
    }
});