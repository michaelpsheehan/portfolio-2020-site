import React, {useState} from 'react'
// import SEO from '../components/seo'
import Section from '../components/core/Section'
import PageTitle from '../components/content/PageTitle'
const ContactPage = () => (
    <>

    <Section
        container
        content={<PageTitle title="Contact Me" underline subtitle />}
          />
    <Section  
        container
        content={
        <>
        <div >

            <form
           className="c-form text-center flex flex-col justify-center"
                name="contact-form"
                method="post"
                action="contact-form-handler.php"
            >
                <label className="c-form__label" htmlFor='name' >Name</label>
                    <input
                        className="c-form__input"
                        name='name'
                        type='text'
                        id='name'
                        />
                <label className="c-form__label" htmlFor='email' >Email</label>
                    <input
                    className="c-form__input"
                        name='email'
                        type='email'
                        id='email'
                        />
                <label className="c-form__label" htmlFor='message' >Message</label>
                    <textarea
                        className="c-form__text-area"
                        className="text-area"
                        name='message'
                        id='message'
                        required
                        />

                <button className="c-form__submit c-button "  type="submit" name="send" id="send">Send</button>
            </form>

        </div>
        </>

        }
        
        />
        </>
)

export default ContactPage
