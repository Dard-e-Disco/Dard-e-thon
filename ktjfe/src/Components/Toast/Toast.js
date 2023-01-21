import React,{useEffect,useState} from 'react'
import "./Toast.css"
import cross from "./icons8-multiply-24.png"
const Toast = ({toast,setToast}) => {
  const [ToastDisplay, setToastDisplay] = useState(true)
useEffect(() => {
  document.getElementsByClassName("toast__close")[0].parentElement.style.display="block"
  document.getElementsByClassName("anima")[0].style.width="0%"
  document.getElementsByClassName("anima")[0].style.transition="all 4s ease"
  let arrayOfSetTimeout
  arrayOfSetTimeout=close_toast()
  setTimeout(() => {
      document.getElementsByClassName("toast__close")[0].parentElement.style.opacity=1;
      document.getElementsByClassName("anima")[0].style.width="100%"
    
    
  }, 100);
  return()=>{
    arrayOfSetTimeout.forEach(element => {
      clearTimeout(element)
    });
  }
  }
    , [])

    function close_toast(){
    if(ToastDisplay){

     var closeDisplay=   setTimeout(() => {
        document.getElementsByClassName("toast__close")[0].parentElement.style.opacity=0;
        
    }, 3000);
var closeDisplay1 =setTimeout(() => {
  document.getElementsByClassName("anima")[0].style.width="0%"
        document.getElementsByClassName("toast__close")[0].parentElement.style.display="none"

    setToastDisplay(false)
    setToast({
      istrue:false,
      message:"",
      type:""
    })
    

}, 4000);}
  return [closeDisplay,closeDisplay1]
    }
    function close_toast_button(){
      document.getElementsByClassName("toast__close")[0].parentElement.style.opacity=0;
      setTimeout(() => {
        if(toast.istrue){
          document.getElementsByClassName("anima")[0].style.width="0%"
            document.getElementsByClassName("toast__close")[0].parentElement.style.display="none"

        setToastDisplay(false)
        return
        }
        
    }, 1000)
    }
    
  return (
    <div><div className="toast__container">
    <div className="toast__cell">
    
    
    <div className={`toast toast--${toast.type=="Success"?"green":"red"} add-margin`}>
      <div className="anima"></div>
      <div className="toast__icon">
    {toast.type=="Success"?<svg version="1.1" className="toast__svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" width={"14px"} height={"14px"}>
<g><g><path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z"></path>
	</g></g>
    </svg>:<img src={cross} width={"14px"} height={"14px"}/>}

    
      </div>
      <div className="toast__content">
        {/* <p className="toast__type">{toast.type}</p> */}
        <p className="toast__message">{toast.message}</p>
      </div>
      <div className="toast__close" onClick={close_toast_button}>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642" enableBackground="new 0 0 15.642 15.642">
  <path fillRule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"></path>
</svg>
  </div>
    </div>
    </div>
    </div>
    </div>
    
  )
}

export default Toast