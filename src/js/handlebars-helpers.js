Handlebars.registerHelper('lowerCase', email => {
    return email.toLowerCase();
});

Handlebars.registerHelper('workDays', hireDate => {
    let date = hireDate;
    let getDays = new Date(date).getTime();
    let today = new Date().getTime();
    let difference = today - getDays;
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days;
});

Handlebars.registerHelper("list", function(context, options) {
    var ret = `<ul class="navbar-nav align-items-center">`;
  
    for (var i = 0, j = context.length; i < j; i++) {
        ret = ret + `<li class="nav-item">` + options.fn(context[i]) + `</li>`;
    }
    return ret + `</ul>`;
});
