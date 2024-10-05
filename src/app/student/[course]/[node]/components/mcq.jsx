'use client'
import MdText from '@/app/utils/mdText';
import React, { useEffect, useState } from 'react'

function shuffleArray(array) {
  
  const tempArray = array.slice();
  for (var i = tempArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = tempArray[i];
      tempArray[i] = tempArray[j];
      tempArray[j] = temp;
  }
  
  return tempArray;
}

const OptionCard = ({text, onSetAnswer, currentNode}) => {
  
  
  return (<div>
      <div style={{
        border: "1px solid lightgray",
        margin: "3px",
        borderRadius: "5px",
        padding: "3px",
        backgroundColor: "white"
      }}
      onClick={() => onSetAnswer(text, currentNode.partNo, currentNode.index)}
      >
        <MdText>{text.replace(/_/g, ' ')}</MdText>
      </div>
    </div>)
}

const MCQ = ({instruction, text, explanation, style, addMark, addTotal}) => {
  // const lines = text.split(/@[\w|\,|\:|\(|\)]+@/);
  const lines = text.split(/@[^@]*:[^@]*@/);
  // const matches = text.match(/@[\w|\,]+:[\w|\,]*@/g);
  const matches = text.match(/@[^@]*:[^@]*@/g);

  const words = text.split(" ");


  const [answers, setAnswers] = useState(matches?matches.map((e) => {
    // const correctMatch = e.match(/@([\w|\,|\(|\)]+):([\w|\,|\(|\)]*)@/); 
    const correctMatch = e.match(/@([^@]*):([^@]*)@/);
    const corr = correctMatch[1];
    const wro = correctMatch[2]?(","+correctMatch[2]):"";
      return {
        options: shuffleArray((corr+wro).split(',')),
        correct: correctMatch[1].split(','),
        value: Array.from({ length: correctMatch[1].split(',').length }, (x, i) => "")
      }
  }):[]);

  
  const [currentNode, setCurrentNode] = useState({
    partNo: 0,
    index: 0
  });
  console.log(currentNode);
  const getAllOptions = (ans) => {
    let tempOptions = []
    ans.forEach((e) => {
      tempOptions = [...tempOptions, ...e.options]
    })

    return shuffleArray(tempOptions);
  }
  
  const [options, setOptions] = useState(getAllOptions(answers));
  const [allDone, setAllDone] = useState(false)

  const onSetAnswer = (value, partNo, index) => {
    const tempAns = [...answers];
    tempAns[partNo].value[index] = value;
    setAnswers(tempAns);
    
    let tempNode = null;
    for (let i = 0; i < tempAns.length; i++ ) {
      if(tempNode) 
        break;
        for (let j = 0; j < tempAns[i].value.length; j++ ) {
        if(tempAns[i].value[j] === "")
        {
          tempNode = {
            partNo: i,
            index: j
          }
          break;
        }
      }
    }

    
    if (!tempNode) {
      tempNode = { partNo: 0, index: 0 };  // Default value when everything is filled
    }
    
    setCurrentNode(tempNode);

    if(answers[partNo].correct.includes(value))
    {
      
      addMark? addMark():null;
      
      const delIdx = options.indexOf(value);
      const tempOptions = options.filter((e,i) => delIdx!=i);
      setOptions(tempOptions);
    }
  }

  useEffect(() => {
    let done = true;
    answers.forEach(element => {
      element.value.forEach((e) => {
        if(e==="")
          done = false;
      })
    });

    setAllDone(done)

  }, [answers])

  useEffect(() => {
    // const matches = text.match(/@[\w|\,|\(|\)]+:[\w|\,|\(|\)]*@/g);
    const matches = text.match(/@[^@]*:[^@]*@/g);
    const tempAnswers = matches?matches.map((e) => {
      // const correctMatch = e.match(/@([\w|\,|\(|\)]+):([\w|\,|\(|\)]*)@/); 
      const correctMatch = e.match(/@([^@]*):([^@]*)@/);
      const corr = correctMatch[1];
      const wro = correctMatch[2]?(","+correctMatch[2]):"";
        return {
          options: shuffleArray((corr+wro).split(',')),
          correct: correctMatch[1].split(','),
          value: Array.from({ length: correctMatch[1].split(',').length }, (x, i) => "")
        }
    }):[]
    setAnswers(tempAnswers)
    setOptions(getAllOptions(tempAnswers))
  }, [text])

  


  return <>
  <div style={{paddingLeft:"0px", marginLeft:"20px", marginBottom:"20px"}}>
  {/* <p style={{opacity:0.4, fontSize:12, paddingBottom:'5px'}}>Quiz</p> */}
    <div style={{ marginBottom:"10px"}}>
      {instruction?<MdText>{instruction}</MdText>:null}
    </div>
    {style==="dropdown"?
      <div>
    
      <div style={{display:"inline-flex", flexDirection:"row", flexWrap:"wrap", marginLeft:"0px",}}>
      {
        answers.map((ans, partNo) => {
        return [lines[partNo].split(" ").map((word) => {
            
            if(word)
            {
              return <div style={{ marginRight:"5px"}}>
              <MdText>{word}</MdText>
            </div>
            }
            else {
              return null
            }
            
          }), <select
          defaultValue=""
          disabled={answers[partNo].value[0]!==""}
          onChange={(option) => {
            answers[partNo].value.forEach((e,i) => {
              if(e==="")
              {
                onSetAnswer(option.target.value, partNo, i);
              }
                
            })
          }}
          style={{marginRight:"5px",backgroundColor:answers[partNo].correct.includes(answers[partNo].value[0])?"lightgreen":answers[partNo].value[0]!==""?"red":"white"}}
        >
          <option value="" disabled>
            Select
          </option>
          {
            ans.options.map((option) => <option value={option} >{option}</option>)
          }
        </select>]
        })
      }
        <div style={{marginRight:"5px"}}>
          <MdText>{lines[lines.length-1]}</MdText>
        </div>
        </div>
      </div>
    
    :style==="mcqh"?<div>
      {answers.map((ans, partNo) => 
          <div>
            <div style={{marginLeft:"0px"}}>
              <MdText>{lines[partNo]}</MdText>
            </div>
            <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                {
                  ans.options.map((option, index) => <div style={{paddingTop:"5px", paddingRight:"5px"}}>
                    <button  style={{
                      border: "1px solid lightgray",
                      margin: "3px",
                      borderRadius: "5px",
                      padding: "3px",
                      backgroundColor: "white", 
                      border:answers[partNo].value.includes(option)&&answers[partNo].correct.includes(option)?"2px solid lightgreen":answers[partNo].value.includes(option)?"2px solid red":"1px solid lightgrey"}}
                      onClick={() => {
                        let clicked = false;
                        answers[partNo].value.forEach((e,i) => {
                          if(e===""&&!clicked)
                          {
                            onSetAnswer(option, partNo, i);
                            clicked = true;
                          }
                            
                        })
                      }}
                    >
                      <MdText>{option}</MdText> 
                    </button>
                  </div>)
                }
              </div>
            </div>)
      }
      <div style={{marginRight:"5px"}}>
        <MdText>{lines[lines.length-1]}</MdText>
      </div>
    </div>
    :
    style==="fib"?<>
      <div style={{display:"inline-flex", flexDirection:"row", flexWrap:"wrap", marginLeft:"0px",}}>
      {
        answers.map((ans, partNo) => {
        return [lines[partNo].split(" ").map((word) => {
            
            if(word)
            {
              return <div style={{ marginRight:"5px"}}>
              <MdText>{word}</MdText>
            </div>
            }
            else {
              return null
            }
            
          }), ans.correct.map((blank, i) => 
            (<div style={{border:currentNode?.partNo===partNo&&currentNode?.index===i&&ans.value[i]===""?"1px solid black":ans.value[i]===""?"1px solid lightgrey":ans.correct.includes(ans.value[i])?"1px solid lightgreen":"1px solid red", padding:"2px 5px 2px 5px", margin:"0px 2px 0px 2px", borderRadius:"2px"}} >
              <MdText>{answers[partNo].value[i]===""?"\_\_":answers[partNo].value[i]}</MdText>
            </div>)
            )]
        })
      }
        <div style={{marginRight:"5px"}}>
          <MdText>{lines[lines.length-1]}</MdText>
        </div>
        </div>

      {!allDone?<div style={{display: "flex", flexWrap: "wrap"}}>
        {options.map((e, i) => <OptionCard text={e} i={i+1} onSetAnswer={onSetAnswer} currentNode={currentNode} />)}
      </div>:null}
    </>
    :
    style==="table"?
    <div style={{padding:'5px', borderRadius:"2px", boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19)"}}>
      
      <table style={{width:"100%"}}>
        {answers.map((ans, partNo) => <tr>
          <td style={{width:"50%", border:'1px solid lightgray'}}>
            <div style={{marginLeft:"0px"}}>
              <MdText>{lines[partNo]}</MdText>
            </div>
          </td>
          <td style={{width:"50%", border:'1px solid lightgray'}}>
            <div style={{display:"flex", flexDirection:"row"}}>
              {ans.correct.map((blank, i) => 
                (<div style={{border:currentNode?.partNo===partNo&&currentNode?.index===i&&ans.value[i]===""?"1px solid black":ans.value[i]===""?"1px solid lightgrey":ans.correct.includes(ans.value[i])?"1px solid lightgreen":"1px solid red", padding:"2px 5px 2px 5px", margin:"0px 2px 0px 2px", borderRadius:"2px"}} >
                <MdText>{ans.value[i]===""?"\_\_":ans.value[i]}</MdText>
                </div>)
              )}
            </div>
          </td>
        </tr>)}
      </table>
      {!allDone?
        <div style={{display: "flex", flexWrap: "wrap"}}>
          {options.map((e, i) => <OptionCard text={e} i={i+1} onSetAnswer={onSetAnswer} currentNode={currentNode} />)}
        </div>
        :null}
    </div>
    :
    style==="word"?
    <span style={{display:"inline-flex", flexWrap:"wrap"}}>
      {answers.map((ans, partNo) => {
          return <span style={{marginTop:"7px"}} >
          {[...lines[partNo].split(" ")].map((e, i) => {
          return e?<span onClick={() => onSetAnswer(e, partNo, 0)} style={{border:ans.value.includes(e)?"1px solid lightred":"1px solid lightgrey",  padding:"2px 5px 2px 5px", margin:"2px", borderRadius:"2px"}}>{e}</span>:null
        })}
          <span onClick={() => answers[partNo].value[0]===""?onSetAnswer(answers[partNo].correct[0], partNo, 0):null} style={{border:ans.value[0]===""?"1px solid lightgrey":ans.correct.includes(ans.value[0])?"2px solid lightgreen":"1px solid red", padding:"2px 5px 2px 5px", margin:"0px 0px 0px 0px", borderRadius:"2px"}} >
            {answers[partNo].correct[0]}
          </span>
        </span>
          {/* <span onClick={() => answers[partNo].value[0]===""?onSetAnswer(answers[partNo].correct[0], partNo, i):null} style={{border:ans.value[0]===""?"1px solid lightgrey":ans.correct.includes(ans.value[0])?"2px solid lightgreen":"1px solid red", padding:"2px 5px 2px 5px", margin:"0px 0px 0px 0px", borderRadius:"2px"}} >
          {answers[partNo].correct[0]}
          </span> */}
      })}
      {/* <span style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}} >{answers.map((ans, partNo) => {

      console.log(lines[partNo]);
      return <span style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
        
        {lines[partNo]?lines[partNo].split(" ").map((e, i) => {
          return e?<span onClick={() => onSetAnswer(e, partNo, 0)} style={{border:ans.value.includes(e)?"1px solid lightred":"1px solid lightgrey",  padding:"2px 5px 2px 5px", margin:"0px 2px 0px 2px", borderRadius:"2px"}}>{e}</span>:null
        }):<span>o</span>}
          {ans.correct.map((blank, i) => 
          (<span onClick={() => answers[partNo].value[i]===""?onSetAnswer(answers[partNo].correct[i], partNo, i):null} style={{border:ans.value[i]===""?"1px solid lightgrey":ans.correct.includes(ans.value[i])?"2px solid lightgreen":"1px solid red", padding:"2px 5px 2px 5px", margin:"0px 0px 0px 0px", borderRadius:"2px"}} >
            {answers[partNo].correct[i]}
          </span>)
          )}
        </span>})}
      </span> */}
    </span>:null
    }
    {
      allDone&&explanation?
      <div style={{marginTop:"5px", backgroundColor:"#fef8ff", padding:'5px', borderRadius:"2px", boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19)"}}>  
        <p style={{opacity:0.4, fontSize:12, paddingBottom:'5px'}}>Explanation</p>
        <MdText>{explanation}</MdText>
      </div>
      :null
    }
    </div>
  </>
}

export default MCQ