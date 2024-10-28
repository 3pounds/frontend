import Logo from "./../assets/3pounds_logo.png"

const Header = () => {
    return ( 
        <>
        <img src={Logo} width={256} height={"auto"}></img>
        <h1 style={{fontFamily:"Figtree", color:"#df6c7c", marginTop: "0.2em", borderBottom: "1px solid #dbcdcf"}}>3pounds
        <span style={{color:"#dbcdcf"}}>.fit</span></h1>
       
        </>
     );
}
 
export default Header;
