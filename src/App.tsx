import React from 'react';
import './App.css';
import {As568Data} from './data/values';
function App() {
  const as568 = As568Data
  return (
    <div className="App">
      <h1>O-Ring Size Finder</h1>
      <h2>AS568 Standard</h2>
      <table>
        <thead>
          {as568.headers.map(h=>{
            return <th>{h}</th>
          })}
        </thead>

        <tbody>
          {as568.getValues().map((row,i)=>{
            let rowColor = 'white'
            if (i%2===0) rowColor= `lightgrey`
            return <tr  style={{'background':rowColor}}>
              <td style={{color:'darkBlue'}}>
                {row.code}
              </td>
              <td>
                {row.mmId}
              </td>
              <td>
                {row.mmOd}
              </td>
              <td>
                {row.mmCs}
              </td>
              <td>
                {row.inchId}
              </td>
              <td>
                {row.inchId}
              </td>
              <td>
                {row.inchOd}
              </td>
            </tr>
          })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
