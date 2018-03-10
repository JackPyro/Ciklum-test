import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { sendSuggestion } from 'src/redux/article'
import { Form, Field } from 'react-final-form'

@connect(
  state => ({})
  , {sendSuggestion})
class Paragraph extends Component {
  submit = (values) => {
    const {text, url, sendSuggestion} = this.props
    sendSuggestion(({originalText: text, url: url, userText: values.userText}))
  }

  render () {
    const {text} = this.props
    return (
      <Wrapper>
        <Title> Original Text </Title>
        <Text dangerouslySetInnerHTML={{__html: text}}/>
        <Divider/>

        <Title> User Text </Title>
        <Form
          onSubmit={this.submit}
          render={({handleSubmit, pristine, invalid, submitting}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="userText"
                render={({input, meta}) => (
                  <TextAreaWrapper>
                    <TextArea {...input} />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </TextAreaWrapper>
                )}
              />
              <SubmitWrapper>
                <SubmitBtn type="submit" disabled={pristine || invalid}>
                  {submitting ? 'Submitting' : 'Submit'}
                </SubmitBtn>
              </SubmitWrapper>
            </form>
          )}
        />
      </Wrapper>
    )
  }
}

const TextArea = styled.textarea`
  resize: none;
`

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const SubmitWrapper = styled.div`
  text-align: right;
  margin-top: 10px;
`

const SubmitBtn = styled.button`
  background-color: ${props => props.disabled ? 'gray' : props.theme.colors.default };
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  color: ${props => props.theme.colors.light};
  padding: 5px 10px;
  border: none;
  
`

const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.colors.default};
  padding: 5px 10px 5px 25px;
  margin: 20px 0px;
`
const Divider = styled.hr`
  border-top: 1px solid #8c8b8b;
`
const Title = styled.div`
  color: ${props => props.theme.colors.default};
  text-transform: uppercase;
  font-size: 0.8em;
  margin-bottom: 2px;
`

const Text = styled.div`

`

export default Paragraph