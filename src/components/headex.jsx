import Logo from "./../assets/3pounds_logo.png"

const Header = () => {
    return ( 
        <div style={{display:"flex", justifyContent:"center", height:"50px"}}>
        <img src={Logo} width={"auto"} height={"44px"} ></img>
        
        <h1 style={{fontFamily:"Figtree", 
        color:"#df6c7c",
        fontSize: "2.3em",
         marginTop: "0.2em",
         paddingBottom: "0.3em",
         marginLeft: "0.2em",
         }}>3pounds
        <span style={{color:"#dbcdcf"}}>.fit</span></h1>
        
        </div>
     );
}
 
export default Header;
