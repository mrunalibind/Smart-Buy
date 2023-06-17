const onSignup = () => {
  const payload = {
    name: document.getElementById("name").value,
    email: document.getElementById("Email").value,
    pass: document.getElementById("Password").value,
  };

  fetch("http://localhost:8000/user/reg", {
    method: "POST",

    headers: {
      "Content-type": "application/json",
    },

    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
