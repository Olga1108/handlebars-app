const headerData = [
    {text: 'DOC UA', href: '#'}, 
    {text: 'Category', href: '#'}, 
    {text: 'main', href: '#'}];

window.addEventListener("DOMContentLoaded", () => {
    const resultsNode = document.querySelector('#results');
    const modalNode = document.querySelector('#modalContainer');
    function getAllStudents() {
        let req = new XMLHttpRequest();
        req.open('GET', './data/data.json', true);
        req.setRequestHeader("Content-type", "application/json; charset=utf-8");
        req.send();
        req.addEventListener('load', function() {
            if (req.status == 200) {
                let db = JSON.parse(req.response);
                resultsNode.innerHTML = render('studentsTemplate', {list: db});
                const btns = document.querySelectorAll('.card--btn');
                btns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        modalNode.innerHTML = '';
                        let targetElement = e.target.closest('.card--btn');
                        let id = targetElement.id;
                        let student = db.find(item => item.employeeId === id);
                        console.log(student);
                        modalNode.innerHTML = render('modalTemplate', student);
                    })
                })
            } else {
                console.error('Something is going wrong');
            }
        })
    }

    function render(templateName, model) {
        const templateElement = document.getElementById(templateName);
        const templateSourse = templateElement.innerHTML;
        const renderFn = Handlebars.compile(templateSourse);
        return renderFn(model);
    }
    getAllStudents();
    const headerNode = document.querySelector('.collapse');
    headerNode.innerHTML = render('headerTemplate', {nav: headerData});
})