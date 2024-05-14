const mensajeError = document.getElementsByClassName('error')[0];

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(e);
    const user = e.target.children.user.value;
    const password = e.target.children.password.value;
    const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user, password
        })
    });
    if (!user.ok) return mensajeError.classList.toggle('hidden', false);
    const resJson = await res.json();
    if (resJson.redirect) {
        window.location.href = resJson.redirect;
    }

})