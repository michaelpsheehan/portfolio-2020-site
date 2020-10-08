import React, { useState, useRef, useEffect } from 'react'
import SEO from '../components/core/Seo'
import staggerItemsIn from '../animations/staggerItemsIn'
import Section from '../components/core/Section'
import PageTitle from '../components/content/PageTitle'
import { graphql, useStaticQuery } from 'gatsby'
import gsap from 'gsap/gsap-core'

const ContactPage = () => {
  const pageData = useStaticQuery(graphql`
    query contactQuery {
      craft {
        entry: entries(id: "671") {
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
      }
    }
  `)

  const { entry, globalSets } = pageData.craft
  const seoMeta = entry.length ? entry[0].seoMeta : null

  const formRef = useRef(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
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
    gsap.set(formRef.current, { delay: 0.2, autoAlpha: 1 })
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
        title={seoMeta ? seoMeta.title : null}
        description={seoMeta ? seoMeta.description : null}
        socialMeta={seoMeta ? seoMeta.social : null}
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
                className="c-form text-center flex flex-col justify-center invisible"
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
