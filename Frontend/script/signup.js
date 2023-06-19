// const onSignup= ()=>{

//     const payload={

//     name:document.getElementById("name").value,
//      email:document.getElementById("Email").value,
//       password:document.getElementById("Password").value

//     }

//     fetch("https://dark-red-hippopotamus-toga.cyclic.app/user//signup", {

//     method: "POST",

//     headers: {

//     "Content-type":"application/json"

//     },

//     body: JSON.stringify(payload)

//     }).then(res=>res.json())
//      .then(res=>console.log(res)

//      )
//      alert("Signup Successfull")
//    //  console.log(payload)
//     .catch(err=>console.log(err))

//     }

const onSignup = document.getElementById("Signupbtn");
onSignup.addEventListener("click", async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById("name").value,
    email: document.getElementById("Email").value,
    password: document.getElementById("Password").value,
  };

  console.log(payload);

  try {
    let url = "https://dark-red-hippopotamus-toga.cyclic.app/user/signup";

    let responce = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let res = await responce.json();
    console.log("res", res);
    //   document.getElementById("from").reset()
    localStorage.setItem("otp", res.OTP);
    alert(` OTP send ${payload.email}`);
    window.location.href = "../html/OTP.html";
  } catch (error) {
    console.log(error.message);
  }
});
