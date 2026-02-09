const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      {
        name,
        email,
        message,
      },
      import.meta.env.VITE_PUBLIC_KEY
    )
      .then(() => {
        console.log("Email sent!");
        alert("Message sent successfully!");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to send message.");
      });
  }