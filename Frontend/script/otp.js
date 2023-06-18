const otp = async () => {

    const payload = {
  
    //  name: document.getElementById("name").value,
     // email: document.getElementById("Email").value,
      password: document.getElementById("OTP").value
  
    }
  
    console.log(payload)
  
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
      console.log('res',res)
   //   document.getElementById("from").reset()
      alert(` Successfull signup`)
      window.location.href="./home"
  
  } catch (error) {
    console.log(error.message)
  }
   
  }