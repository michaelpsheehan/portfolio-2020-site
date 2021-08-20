import React from 'react'
import { render, screen } from '@testing-library/react'
import Text from '../Text'

// first test just to get jest working in the repo. Will likely extract the components into their own component library with storybook and tests
const defaultProps = { heading: 'this is heading ' }
test('renders learn react link', () => {
    const text = render(<Text {...defaultProps} />)
    console.log('container test log')
    expect(text).toMatchInlineSnapshot(`
        Object {
          "asFragment": [Function],
          "baseElement": <body>
            <div>
              <div
                class="c-text "
              >
                <h2
                  class="c-text__heading"
                >
                  this is heading 
                </h2>
              </div>
            </div>
          </body>,
          "container": <div>
            <div
              class="c-text "
            >
              <h2
                class="c-text__heading"
              >
                this is heading 
              </h2>
            </div>
          </div>,
          "debug": [Function],
          "findAllByAltText": [Function],
          "findAllByDisplayValue": [Function],
          "findAllByLabelText": [Function],
          "findAllByPlaceholderText": [Function],
          "findAllByRole": [Function],
          "findAllByTestId": [Function],
          "findAllByText": [Function],
          "findAllByTitle": [Function],
          "findByAltText": [Function],
          "findByDisplayValue": [Function],
          "findByLabelText": [Function],
          "findByPlaceholderText": [Function],
          "findByRole": [Function],
          "findByTestId": [Function],
          "findByText": [Function],
          "findByTitle": [Function],
          "getAllByAltText": [Function],
          "getAllByDisplayValue": [Function],
          "getAllByLabelText": [Function],
          "getAllByPlaceholderText": [Function],
          "getAllByRole": [Function],
          "getAllByTestId": [Function],
          "getAllByText": [Function],
          "getAllByTitle": [Function],
          "getByAltText": [Function],
          "getByDisplayValue": [Function],
          "getByLabelText": [Function],
          "getByPlaceholderText": [Function],
          "getByRole": [Function],
          "getByTestId": [Function],
          "getByText": [Function],
          "getByTitle": [Function],
          "queryAllByAltText": [Function],
          "queryAllByDisplayValue": [Function],
          "queryAllByLabelText": [Function],
          "queryAllByPlaceholderText": [Function],
          "queryAllByRole": [Function],
          "queryAllByTestId": [Function],
          "queryAllByText": [Function],
          "queryAllByTitle": [Function],
          "queryByAltText": [Function],
          "queryByDisplayValue": [Function],
          "queryByLabelText": [Function],
          "queryByPlaceholderText": [Function],
          "queryByRole": [Function],
          "queryByTestId": [Function],
          "queryByText": [Function],
          "queryByTitle": [Function],
          "rerender": [Function],
          "unmount": [Function],
        }
    `)
})
