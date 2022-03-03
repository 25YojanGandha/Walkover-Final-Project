import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import { RiSendPlaneFill } from 'react-icons/ri';
import { HiFilter } from 'react-icons/hi';

// import { realTimeDataBase } from '../../firebase-config';
import { GlobalData } from '../../App';
import './Table.css'

function Table() {
  let gData = useContext(GlobalData);
  let tabelArr = gData.tableDataFromDatabase
 return (
   <>
     {tabelArr.map((arrSingleData) => {
       return (
         <div className='tableBox_divScrollContainer'>
           <div className='tableBox_mainContainer'>
             <div className='tableBoxTableName'>
               <div className='tableBoxtableName_NameBox'>
                 <div className='tableNameInnerBox'>
                   {arrSingleData.tableName}
                 </div>
                 <div className='tableNameInnerInputBox'>
                   <div className='tableNameInnerInputBox_iconBox'>
                     <HiFilter />
                     <input placeholder='Search...' type="text" />
                   </div>
                 </div>
               </div>
               <div className='tableBoxTableName_delete_update_search_Box'>
                 <div class='createBtnTable_container'>
                   <div class='tableBtn'>
                     <RiSendPlaneFill />
                     Update
                   </div>
                 </div>
                 <div class='createBtnTable_container'>
                   <div
                     class='tableBtn'
                     style={{ 'background-color': 'rgb(217, 48, 37' }}
                   >
                     <MdDelete /> Delete
                   </div>
                 </div>
               </div>
             </div>
             <div className='tableBox_tableContainer'>
               <table>
                 <thead className='tableBox_head'>
                   <tr>
                     {arrSingleData.column ?arrSingleData.column.map((e) => {
                       return <th>{e.heading}</th>;
                     }):""}
                   </tr>
                   <tr>
                     {arrSingleData.column?arrSingleData.column.map((e) => {
                       return <th>{e.type}</th>;
                     }):''}
                   </tr>
                 </thead>
                 <tbody>
                   {arrSingleData.row.map((innerArr) => {
                     return (
                       <tr>
                         {innerArr?innerArr.map((e) => {
                           return <td contentEditable>{e}</td>;
                         }):''}
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
             </div>
           </div>
         </div>
       );
     })}
   </>
 );
}

export default Table;