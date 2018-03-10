import React, { Component } from 'react'
import styled from 'styled-components'
import Card from 'src/modules/Shared/Card'
import Suggestion from 'src/modules/Result/Suggestion'
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom'

class Results extends Component {

  submit = (values) => {
    const {send} = this.props
    if (!values.userText) { return false }
    send(values)
  }

  render () {
    const {results, approve, remove} = this.props
    return (
      <Wrapper>
        {results.map(result => (
          <Card>
            <Link to={`/fb?articleURL=${result.url}`}> Link to article </Link>
            <CardHeader>
              <Title>Original Text</Title>
              <Delete onClick={() => remove(result.originalText)}> Delete </Delete>
            </CardHeader>
            <div dangerouslySetInnerHTML={{__html: result.originalText}}/>
            <ResultsWrap>
              <Title>User Suggestions</Title>
              {result.suggestions.map(suggestion => (
                <Suggestion
                  suggestion={suggestion}
                  approve={approve}
                />
              ))}
            </ResultsWrap>
            <Title> Add your own response </Title>
            <Form
              onSubmit={this.submit}
              initialValues={{url: result.url, originalText: result.originalText}}
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
          </Card>
        ))}
      </Wrapper>
    )
  }
}
const CardHeader = styled.div`
  align-items: center;
  margin-top: 15px;
  display: flex;
  justify-content: space-between
`

const ResultsWrap = styled.div`
  margin-top: 20px;
`

const Title = styled.div`
  color: ${props => props.theme.colors.default};
  text-transform: uppercase;
  font-size: 0.8em;
  margin-top: 5px;
  margin-bottom: 2px;
`

const Delete = styled.button`
  background-color: #ec4a4a;
  border: none;
  padding: 5px 15px;
  color: white;
`

const Wrapper = styled.div`
`

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

export default Results