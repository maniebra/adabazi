import React from 'react'
import PickerTab from './picker-tab'

describe('<PickerTab />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PickerTab />)
  })
})