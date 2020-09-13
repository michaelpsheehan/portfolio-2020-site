import React, { useState, useRef, useEffect } from 'react'
import SEO from '../components/seo'
import staggerItemsIn from '../animations/staggerItemsIn'
import Section from '../components/core/Section'
import PageTitle from '../components/content/PageTitle'
import { graphql, useStaticQuery } from 'gatsby'

const ContactPage = () => {
  const pageData = useStaticQuery(graphql`
    query contactQuery {
      craft {
        entry {
          ... on Craft_contact_contact_Entry {
            id
            title
            seoMeta {
              title
              description
              social {
                facebook {
                  title
                  description
                  image {
                    ... on Craft_images_Asset {
                      id
                      optimizedImagesGridThumbnail {
                        src
                      }
                    }
                  }
                }
                twitter {
                  title
                  description
                  image {
                    ... on Craft_images_Asset {
                      id
                      optimizedImagesGridThumbnail {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
        globalSets {
          ... on Craft_socialLinks_GlobalSet {
            id
            name
            twitterUsername
            linkedinUrl
            handle
          }
        }
      }
    }
  `)

  const { entry, globalSets } = pageData.craft
  const { seoMeta } = entry
  const [fallbacks, socialLinks] = globalSets

  console.log('data on the contact page ==', pageData)
  console.log('globalSets', globalSets)
  console.log('social links', socialLinks)

  const formRef = useRef(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    console.log('event =')
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formState }),
    })
      .then(() => {})
      .catch((error) => {
        alert(
          `There was an error submitting the form ${error}. Please try again.`
        )
      })
  }
  useEffect(() => {
    const tl = staggerItemsIn(formRef.current.children)
    return () => {
      tl.kill()
    }
  }, [])

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&')
  }

  return (
    <>
      <SEO
        title={seoMeta.title || title}
        description={seoMeta.description}
        socialMeta={seoMeta.social}
        twitterHandle={socialLinks.twitterUsername}
      />
      <Section
        container
        content={<PageTitle title="Contact Me" underline subtitle />}
      />
      <Section
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
    </>
  )
}

export default ContactPage
