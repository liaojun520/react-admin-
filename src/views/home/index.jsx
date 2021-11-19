import React from 'react'
import Editor from '@/components/editor'

class Home extends React.Component {
  state = {
    content: '',
  }
  render() {
    let {content} = this.state
    return (
      <div style={{position:'relative',width:'100%'}}>
        <Editor
          value={content}
          callback={r=>this.updateEditorContent(r)}
          id={"#text"}
        />
        {/* <hr/>
        <div>内容：{content}</div>
        <hr/>
        <div dangerouslySetInnerHTML={{__html:content}}></div> */}
      </div>
    )
  }
  updateEditorContent = (content) =>{
    this.setState({ content })
  }
}

export default Home
