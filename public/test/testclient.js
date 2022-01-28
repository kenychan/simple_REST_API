import * as api from './api.js'

const output = document.getElementById('output')

async function runTest() {
  log('Starting Test')
  const allIDs1 = await api.getAllUserIDs();
  log('all user IDs: '+ allIDs1);
  
  const newuser1 = await api.createUser('newuser');
  log('new user: name = '+'\'newuser\' created. \n user object: '+newuser1);
  const newuser2 = await api.createUser(NaN);
  log('new user: name = '+'\'NaN\'  \n user object: '+newuser2);

  const getuserbyuserid1 = await api.getuserObjByUserID(1);
  log('get user object by userID = 1 \n object: '+ getuserbyuserid1);
  const getuserbyuserid2 = await api.getuserObjByUserID('fsaf');
  log('get user object by userID = fsaf \n object: '+ getuserbyuserid2);

  const changeusernamebyuserid1 = await api.updateUserNameByUserID(1,'changed_username');
  log('change username by userID = 1 \n modified object: '+ changeusernamebyuserid1);
  const changeusernamebyuserid2 = await api.updateUserNameByUserID(6,'changed_username');
  log('change username by userID = 6 \n modified object: '+ changeusernamebyuserid2);

  const deleteuserByUserid1 = await api.deleteuserByUserID(1);
  log('deleted user by userId = 1 \n new user objects: ' + deleteuserByUserid1);
  const deleteuserByUserid2 = await api.deleteuserByUserID(7);
  log('deleted user by userId = 7 \n new user objects: ' + deleteuserByUserid2);

  const getListIDsByUserid1 = await api.getListIDsByUserID(0);
  log('get ListIDs by userID = 0 \n ListIDs:'+getListIDsByUserid1);
  const getListIDsByUserid2 = await api.getListIDsByUserID(10);
  log('get ListIDs by userID = 10 \n ListIDs:'+getListIDsByUserid2);

  const createListByUserID1 = await api.createListByUserID(0,'newlist');
  log('create new list by userID = 0, list name = newlist\n object: '+createListByUserID1);
  const createListByUserID2 = await api.createListByUserID(-1, 'ddddd');
  log('create new list by userID = -1, list name = ddddd \n object: '+createListByUserID2);
  
  const getListObjByUserAndListid1 = await api.getListObjByUserAndListID(0,0);
  log('get list object by UserID = 0 ,listID = 0 \n list object: '+getListObjByUserAndListid1);
  const getListObjByUserAndListid2 = await api.getListObjByUserAndListID(11,0);
  log('get list object by UserID = 11 ,listID = 0 \n list object: '+getListObjByUserAndListid2);

  const updateListnameByUserAndListid1 = await api.updateListnameByUserAndListID(0,0,'new_listname');
  log('update list name to \'new_listname\' by UserID = 0 ,listID = 0 \n update list object: '+ updateListnameByUserAndListid1);
  const updateListnameByUserAndListid2 = await api.updateListnameByUserAndListID(0,11,'new_listname');
  log('update list name to \'new_listname\' by UserID = 0 ,listID = 11 \n update list object: '+ updateListnameByUserAndListid2);

  const deleteListObjByUserAndListid1 = await api.deleteListObjByUserAndListID(0,1);
  log('delete list by UserID = 0 ,listID = 1 ,list deleted \n delete list object: '+deleteListObjByUserAndListid1);
  const deleteListObjByUserAndListid2 = await api.deleteListObjByUserAndListID(0,11);
  log('delete list by UserID = 0 ,listID = 11 ,list deleted \n delete list object: '+deleteListObjByUserAndListid2);

  const getTaskIDsByUserAndListID1 = await api.getTaskIDsByUserAndListID(0,0);
  log('get taskIDs by userID = 0 listID = 0 \n taskIDs are: '+ getTaskIDsByUserAndListID1);
  const getTaskIDsByUserAndListID2 = await api.getTaskIDsByUserAndListID(10,0);
  log('get taskIDs by userID = 10 listID = 0\n taskIDs are: '+ getTaskIDsByUserAndListID2);

  const createTaskByUserAndListID1 = await api.createTaskByUserAndListID(0,0,'newtask111'); 
  log('create task: \'newtask111\' by userID = 0, listID = 0 \n task object: '+createTaskByUserAndListID1);
  const createTaskByUserAndListID2 = await api.createTaskByUserAndListID(110,0,'newtask111'); 
  log('create task: \'newtask111\' by userID = 110, listID = 0 \n task object: '+createTaskByUserAndListID2);

  const getTaskObjByUserAndListAndTaskID1 = await api.getTaskObjByUserAndListAndTaskID(0,0,4);
  log('get task obejct by UserID = 0 ,listID = 0 ,taksID = 4\n task object: '+ getTaskObjByUserAndListAndTaskID1);
  const getTaskObjByUserAndListAndTaskID2 = await api.getTaskObjByUserAndListAndTaskID(0,0,40);
  log('get task obejct by UserID = 0 ,listID = 0 ,taksID = 40\n task object: '+ getTaskObjByUserAndListAndTaskID2);

  const updateTaskName_done_ByUserAndListAndTaskID1 = await api.updateTaskName_done_ByUserAndListAndTaskID(0,0,4,'newly_modified_taskname',true);
  log('update task name to \'newly_modified_taskname\', done to \'true\' by UserID = 0 ,listID = 0 ,taksID = 4\n task object: '+ updateTaskName_done_ByUserAndListAndTaskID1);
  const updateTaskName_done_ByUserAndListAndTaskID2 = await api.updateTaskName_done_ByUserAndListAndTaskID(30,0,4,'newly_modified_taskname',true);
  log('update task name to \'newly_modified_taskname\', done to \'true\' by UserID = 30 ,listID = 0 ,taksID = 4\n task object: '+ updateTaskName_done_ByUserAndListAndTaskID2);

  const deleteTaskObjByUserAndListAndTaskID1 = await api.deleteTaskObjByUserAndListAndTaskID(0,0,0);
  log('delete task obejct by UserID = 0 ,listID = 0 ,taksID = 0\n task object: '+ deleteTaskObjByUserAndListAndTaskID1);
  const deleteTaskObjByUserAndListAndTaskID2 = await api.deleteTaskObjByUserAndListAndTaskID(0,220,0);
  log('delete task obejct by UserID = 0 ,listID = 220 ,taksID = 0\n task object: '+ deleteTaskObjByUserAndListAndTaskID2);

  const multiuser1 = await api.getMultiuser();
  log('multiuser: '+multiuser1);

  const max_ids1 = await api.getMax_IDs();
  log('max IDs: '+max_ids1);

}

function log(text) {
  let p = document.createElement('li')
  p.innerText = text 

  let newline = document.createElement('li')
  newline.innerText = ''
  output.appendChild(p)
  output.appendChild(newline)
}




runTest()
