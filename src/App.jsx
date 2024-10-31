import { useState, useEffect, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {data} from "./data/data.js"
import {Context} from "./context/context.jsx"
import Header from "./components/headex.jsx"


const App = () => {
  
  const [questions, setQuestions] = useState([])
  const {handleChangeForm, globalForm, handleSubmit} = useContext(Context)
  // const [startingQuestion, setStartingQuestion] = useState("162")
  // const [currentQuestion, setCurrentQuestion] = useState("2")
  const [currentOutlineNumber, setCurrentOutlineNumber] = useState("1")
  const [currentOutlineLevel, setCurrentOutlineLevel] = useState("1")
 
  const [currentOptions, setCurrentOptions] = useState([])
  const [currentQuestions, setCurrentQuestions] = useState([])
  const [pendingQuestions, setPendingQuestions] = useState([])

  const [endQuestion, setEndQuestion] = useState(false)
  

  const onClickContinue = () => { 
    console.log("onClick")     
    console.log("currentOptions", currentOptions.length)
    if(currentOptions.length > 0) {
      currentOptions.forEach((node) => {
        if(globalForm[node.ID] == true){
          // setCurrentQuestion(node.ID)
          setCurrentOutlineNumber(node.OutlineNumber)
          setCurrentOutlineLevel((parseInt(node.OutlineLevel)+1).toString()) // 2 levels
        }
      })
    }
    else {
      handlePendingQuestions()
    }
   
  
    setCurrentOptions([]) //reset options
    setCurrentQuestions([]) //reset questions

  }

  const findByOutlineNumber = (data, OutlineNumber) => {
    for (const obj of data) {    
      if (obj.OutlineNumber === OutlineNumber) {
        return obj; // Return the object if the id matches
      }     
      if (obj.children) {
        // Recursively check each child
        for (let child of obj.children) {
          const result = findByOutlineNumber(obj.children, OutlineNumber);
          if (result) {
            return result; // Return as soon as we find a match
          }
        }
      }
    }
    return null; // Return null if no match is found
  }

  const findByOutlineNumber2 = (data, id) => {
    for (const item of data) {
      if (item.OutlineNumber === id) {  // If the current item matches the id, return it
        return item;
      }
      
      // If the current item has nested children, search within them
      if (item.children && item.children.length > 0) {
        const result = findByOutlineNumber2(item.children, id);
        if (result) {
          return result;
        }
      }
    }
    
    // If no match is found, return null
    return null;
  }

  const checkNoMoreChilds = (currentOutlineNumber) => {
    
    let child = currentOutlineNumber + ".1"
    let find = findByOutlineNumber2(data, child)
    // console.log("checkiedFor", child, "result:", find)
    if(!find) {
      if(pendingQuestions.length > 0) {
       
        handlePendingQuestions()
      }
      else {
        setEndQuestion(!find) //true
      }
    }
  }

  
  const handlePendingQuestions = () => {
        console.log("pendingQuestions", pendingQuestions)
        let nextQuestion = pendingQuestions[0]
        console.log("nextQuestion", nextQuestion)
        setCurrentOutlineNumber(nextQuestion.OutlineNumber)
        setCurrentOutlineLevel(nextQuestion.OutlineLevel) 
        setCurrentQuestions([pendingQuestions[0]])
        const arr = pendingQuestions.slice(1);        
        console.log("pendingQuestionsarr",arr)
        setPendingQuestions(arr)
      
  }

  const checkLevel = (stringLevel) => { //checks if the level matches with current outlinelevel or the one under (options)
    let level = stringLevel
    if(level == currentOutlineLevel || parseInt(level) == (parseInt(currentOutlineLevel) + 1)) {
      return true
    }
    else { return false}
  } 

  const checkStart = (outlineNumber) => { //checks if node start with the current outlinenumber "1.1.3.2.2."
    // avoid fail on 1.10 when check from 1.1
    if(outlineNumber == currentOutlineNumber || outlineNumber.startsWith(currentOutlineNumber + ".")) {
      return true  
    } 
    else { return false }
  }

  const handleCurrentQuestions = (node) => {
    // console.log("handleCurrentQuestions", node)
    let arr = []
    arr = currentQuestions
    console.log("arr", arr)
    if(!arr.includes(node)){
      arr.push(node)
      setCurrentQuestions(arr)
    }
    
  }

  const handleCurrentOptions = (node) => {
    let arr = []
    arr = currentOptions

    if(!arr.includes(node)){
      arr.push(node)
      setCurrentOptions(arr)
    }
   

  }

  const handleChangeSelections = (nodeId, checked) => {
    console.log(checked)
    currentOptions.forEach((option) => {
      let id = option.ID
      if(checked == true && nodeId == id) {
        handleChangeForm(id, true)
      }
      else {
        handleChangeForm(id, false)
      }
    })
    // handleChangeForm(nodeId, checked)
  }

  useEffect(() => {
    console.log("------------------------")
    console.log("currentOutlineLevel", currentOutlineLevel)
    console.log('currentOptions', currentOptions);
    console.log('currentQuestions', currentQuestions);
    console.log('currentOutlineNumber', currentOutlineNumber);
    console.log("------------------------")
     
  });

  useEffect(() => {
    if(endQuestion) {
      console.log("ended")
      handleSubmit()
    }
  }, [endQuestion]);

  useEffect(() => {
    console.log("data", data)
    setQuestions(data)
    let firstQuestion = findByOutlineNumber(data, "1")
    console.log("firstQuestion", firstQuestion)
    setCurrentQuestions([firstQuestion])
  }, []);

  useEffect(() => {
    console.log("CurrentQuesitons", currentQuestions.length)
    // && pendingQuestions.length == 0
    if(currentQuestions.length > 1 ){
      let arr = []
      for(let i = 0; i < currentQuestions.length; i++) {
        if(i > 0){
          arr.push(currentQuestions[i])
          console.log("pendingquestionsarr", currentQuestions[i].Name)
        }
      }
      console.log("pendingquestionsarr", arr)
      let finalArr = [...arr, ...pendingQuestions]
      console.log("pendingquestionsarr", finalArr)
      setPendingQuestions(finalArr)
    }
  }, [currentQuestions])

  useEffect(() => {
    checkNoMoreChilds(currentOutlineNumber)
  }, [currentOutlineNumber]);
  
  
  const RecursiveNode = ({ node }) => {
    // console.log("node", node) xx
    return (
      <>
      {/* {console.log(node.OutlineLevel, node.OutlineNumber, node.Name)} */}
      {(checkStart(node.OutlineNumber) && checkLevel(node.OutlineLevel)) &&
       
      <>
        {/* {console.log(node.OutlineLevel, node.OutlineNumber, node.Name, currentOutlineNumber)} */}
        {/* {node.children.length > 0 ?  */}
        {/* {console.log(node.OutlineLevel, currentOutlineLevel)} */}
        
        {node.OutlineLevel == currentOutlineLevel ? 
         <>
          {handleCurrentQuestions(node)}
          {/* {console.log("currentQuestions", currentQuestions)} */}
          {node.OutlineNumber == currentQuestions[0].OutlineNumber ?
            /* {node.OutlineLevel}  */
            <>
            {node.children.length == 0 ?
            <>
             <h2>Solution:</h2>
             <h3>{node.Name}</h3> 
            </>
            :
            <div className="questQuestion">
              <h2>{node.Name}</h2>
            </div>
            }
            </>

            :
            <>
            </>
          }
         </>
          : 
          node.OutlineNumber.startsWith(currentQuestions[0].OutlineNumber) ?
          <div className="questAnswer">
          {handleCurrentOptions(node)}
          
          <input style={{color:"white", display:'flex'  }}
            type="checkbox"
            onChange={(e) => handleChangeSelections(node.ID, e.target.checked)} 
            id={node.ID}
            name={node.ID} 
            checked={globalForm[node.ID]}
          />
          <label style={{fontSize: "18px", marginLeft:"6px"}}>{node.Name}</label>
          </div>
          :
          <>
          </>
          
       }
       </>
      }

        {/* <p><strong>Outline Number:</strong> {node.OutlineNumber}
        <strong>Outline Level:</strong> {node.OutlineLevel}</p> */}    

        {/* If there are children, recursively render them */}
        {node.children && node.children.length > 0 && (
          <div>
            {node.children.map((child) => (
              <RecursiveNode key={child.ID} node={child} />
            ))}
          </div>
        )}
       
     
      </>
    );
  };

  return (
    <>
    <Header/>
    {!endQuestion ? 
      <div className='questContainer'>
        {questions.length > 0 && 
            <>
            {questions.map((node) => (
              /* console.log("node", node), */
              <RecursiveNode key={node.ID} node={node} />
            ))}
            <button style={{marginTop: "14px"}} onClick={() => onClickContinue()}> Continue </button>
          </>
        }
      </div>
     :
      <>
        <h3>Tree finished</h3>
        <button style={{marginTop: "14px"}} onClick={() => window.location.reload()}> Restart </button>

      </>
    }
    </>
  )
}

export default App
