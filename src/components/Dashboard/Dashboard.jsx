import React, { useContext, useEffect } from "react";
import TableInput from '../TableInput/TableInput';
import { GlobalData } from '../../App';
import { useAuth0 } from '@auth0/auth0-react';
import './Dashboard.css'
import { realTimeDataBase } from "../../firebase-config";
import Table from "../createTable/Table";

function Dashboard() {
  let gData = useContext(GlobalData)
  const { logout, user } = useAuth0();
  

  useEffect(() => {
    let userGmail = user.email.split('.')[0]
      
    let createUserData = async () => {
      realTimeDataBase
        .ref('/userData/')
        .child(userGmail)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
          } else {
            realTimeDataBase
              .ref('/userData/')
              .child(userGmail)
              .child('accountData')
              .set(user);
          }
        });
      await gData.fetchCompleteTableDatafromDatabase();
    }
    createUserData()
  }, [])
  
  return (
    <>
      <div className="table_dashBoard">
        <div className='tabeHeader'></div>
        <div className='tableContaine-bodyGrid'>
          <div className='table_header'>    <div className='createBtnTable_container'>
            <div className='tableBtn'
              onClick={() => logout()}
            > Log Out</div>
          </div>
          </div>
          <div className='filter_createTable_btn'>
            <div className='headFilter_container'></div>
            <div className='createBtnTable_container'>
              <div className='tableBtn'
                onClick={() => {
                  gData.setIsTableComponent(true);
                }}
              > Create Table</div>
            </div>
          </div>
          <div className="tableMainContainerGrid">
            {console.log('table')}
            <Table/>
          </div>

        </div>
      </div>
      {gData.isTableComponent ? <TableInput /> : ''}
    </>
  );
}

export default Dashboard;
