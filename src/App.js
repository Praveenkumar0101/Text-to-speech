// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
// import Register from './Register';
// import Login from './Login';

// import TextToSpeech from './TextToSpeechWithHighlight';

// const App = () => {
//   return (
    
//     //   <div>
//     //     <h1>My App</h1>
//     //  <BrowserRouter>
//     //  <Routes>
//     //       <Route path="/register" component={Register} />
//     //       <Route path="/login" component={Login} />
//     //       <Route path="/home" component={Home} />
//     //       <Route path="/" exact>
//     //         <h2>Welcome! Please register or login.</h2>
//     //       </Route>
//     //       </Routes>
//     //       </BrowserRouter>
     
//     //   </div>

//     <BrowserRouter>
//     //       <Routes>
//     //         <Route path="/" element={<Register />} />
//     //         <Route path="/Login" element={<Login/>} />
//     //
//     //         <Route path="/TextToSpeechWithHighlight" element={<TextToSpeech/>} />
//     //        
//     //       </Routes>
//     //     </BrowserRouter>
 
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import TextToSpeech from "./TextToSpeechWithHighlight";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/TextToSpeechWithHighlight" element={< TextToSpeech/>} />
      </Routes>
    </Router>
  );
}

export default App;