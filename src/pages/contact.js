import React, { useState, useRef, useEffect } from 'react'
// import SEO from '../components/seo'
import staggerItemsIn from '../animations/staggerItemsIn'
import Section from '../components/core/Section'
import PageTitle from '../components/content/PageTitle'
import LottieAnimation from '../components/content/LottieAnimation'
import successAnimation from '../animations/lottie/email-sent-by-todd-rocheford'
import Text from '../components/core/Text'



const ContactPage = () => {
  const formRef = useRef(null)
const [formState, setFormState ] = useState({
  name: "",
  email: "",
  message: ""
})

  const handleChange = (e) => {
    console.log('event =',  )
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })
  }
  const formSuccessMessage = <Section 
    content={
    <div className="text-center pb-32">
      <Text heading='Thank you for your message' />
      <div class="max-w-sm flex justify-center mx-auto">
      <LottieAnimation lottieAnimationData={successAnimation}  startPaused={false} />
      </div>
    </div>
      }
    container
    />

  // let messageSent = formSuccessMessage
  let messageSent = null
  let formError = false

  const handleSubmit = (e) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formState })
    })
      .then(() =>{
        formError = false
      messageSent = formSuccessMessage
        alert("Success!")
      }
      )
      .catch(error =>  {
        alert(error)
        formError = 'error'
      }
        );

    e.preventDefault();
  }
  useEffect(()=> {
    if(messageSent === null) {

      const tl = staggerItemsIn(formRef.current.children,  )
      return () => { 
        tl.kill()
      }
    }
    },[])


    const encode = (data) => {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
    }


    const form =   <Section
    container
    content={
      <>
        <div>
          <form
            className="c-form text-center flex flex-col justify-center"
            name="contact-form"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            ref={formRef}
            action="/success"
          >
              <input type="hidden" name="form-name" value="contact-form" />
            <label className="c-form__label" htmlFor="name">
              Name
            </label>
            <input
              className="c-form__input"
              name="name"
              type="text"
              id="name"
              onChange={handleChange}
              value={formState.name}
            />
            <label className="c-form__label" htmlFor="email">
              Email
            </label>
            <input
              className="c-form__input"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              value={formState.email}
            />
            <label className="c-form__label" htmlFor="message">
              Message
            </label>
            <textarea
              className="c-form__text-area"
              className="text-area"
              name="message"
              id="message"
              onChange={handleChange}
              value={formState.message}

              required
            />

            <button
              className="c-form__submit c-button "
              type="submit"
              name="send"
              id="send"
              onSubmit={handleSubmit}
            >
              Send
            </button>
          </form>
        </div>
       </>
    } 
 />  

 const formPageContent = messageSent === null ? form : messageSent

  return  (
    
  <>
    <Section
      container
      content={<PageTitle title="Contact Me" underline subtitle />}
    />
  {formPageContent}
  </>
)

}

export default ContactPage
