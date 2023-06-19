let login = document.getElementById("loginbtn");
login.addEventListener("click", async (e) => {
  e.preventDefault();

  const payload = {
    email: document.getElementById("Email").value,
    password: document.getElementById("Password").value,
  };
  localStorage.setItem("name", payload.email);
  console.log(payload);

  try {
    let url = "https://dark-red-hippopotamus-toga.cyclic.app/user/login";

    let responce = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let res = await responce.json();
    console.log("res", res.accessToken);
    //   document.getElementById("from").reset()
    localStorage.setItem("token", res.accessToken);

    alert(`${payload.email} Successfull login`);
    window.location.href = "../index.html";
  } catch (error) {
    console.log(error.message);
  }
});
let google = document.getElementById("authgoogle");
google.addEventListener("click", (e) => {
  e.preventDefault();

  let url = "https://dark-red-hippopotamus-toga.cyclic.app/user/auth/google";

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", data.accesstoken);
    })
    .catch((err) => {
      console.log(err);
    });

  // let res = await responce.json();
  // console.log('res',res)
  //   document.getElementById("from").reset()
});
