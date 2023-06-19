// const otp = document.getElementById("otpbtn");
// otp.addEventListener("click",async(e)=>{

// e.preventDefault()

//     const payload = {

//     //  name: document.getElementById("name").value,
//      // email: document.getElementById("Email").value,
//       password: document.getElementById("OTP").value

//     }

//     console.log(payload)

//   try {
//     let url = "https://dark-red-hippopotamus-toga.cyclic.app/user/signup";

//       let responce = await fetch(url, {
//         method: "POST",
//         body: JSON.stringify(payload),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       let res = await responce.json();
//       console.log('res',res)
//    //   document.getElementById("from").reset()
//       alert(` Successfull signup`)
//       window.location.href="../html/home"

//   } catch (error) {
//     console.log(error.message)
//   }

// })

let otpbtn = document.getElementById("otpbtn");
otpbtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let otp = localStorage.getItem("otp");
//   console.log(otp);

  let OTP1 = document.querySelector("#otpinput").value;
//   console.log(OTP1);

  try {
    let url = "https://dark-red-hippopotamus-toga.cyclic.app/user/signup";

    let responce = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ OTP: OTP1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let res = await responce.json();
    console.log("res", res);
    //   document.getElementById("from").reset()
    if (otp == OTP1) {
      alert("Signup successfull");
      window.location.href = "../html/login.html";
    } else {
      alert("Wrong OTP");
    }
  } catch (error) {
    console.log(error.message);
  }
});
