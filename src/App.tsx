import React from 'react';
import './App.css';
import {As568Data} from './data/values';
function App() {
  const as568 = As568Data
  return (
    <div className="App">
      <table>
        <thead>
          {as568.headers.map(h=>{
            return <th>{h}</th>
          })}
        </thead>

        <tbody>
          {as568.getValues().map(row=>{
            return <tr>
              <td>
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
