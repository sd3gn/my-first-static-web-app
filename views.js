const errorTemplate = `
  <div class="bg-red-200 rounded-lg py-2 px-6">
    <ul>
        {{#errors}}
        <li>{{.}}</li>
        {{/errors}}
    </ul>
  </div>
`;

const headerTemplate = `
<header class="bg-gray-800 opacity-70 w-full">
  <div class="container px-4 mx-auto flex justify-between text-white font-bold">
      <div class="w-1/4 py-6">Simple Helpdesk</div>
      <div class="w-3/4 flex gap-12 justify-end">
          <div class="py-6"><a href="/">Home</a></div>
          {{#loggedIn}}
          <div class="py-6"><a href="/tickets.html">Tickets</a></div>
          <div class="py-6"><a href="#" id="log-out">Log Out</a></div>
          {{/loggedIn}}
          {{^loggedIn}}
          <div class="py-6"><a href="/auth.html">Log In</a></div>
          {{/loggedIn}}
      </div>
  </div>
</header>
`;

function displayErrors(errors) {
    const rendered = Mustache.render(errorTemplate, { errors });
    document.getElementById('errors').innerHTML = rendered;
}

function renderHeader(info) {
    const rendered = Mustache.render(headerTemplate, info);
    document.getElementById('header').innerHTML = rendered;
    if (info.loggedIn) {
      document.getElementById('log-out').onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem(LS_CURRENT_USER_EMAIL);
        window.location = '/';
      }
    }
}

function render(name, target, data) {
    document.getElementById('errors').innerHTML = '';
    const template = document.getElementById(`template-${name}`).innerHTML;
    const rendered = Mustache.render(template, data);
    document.getElementById(target).innerHTML = rendered;
}