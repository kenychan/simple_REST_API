const url = 'http://127.0.0.1:3000/api/';

export async function getAllUserIDs() {
    try{
        const res = await fetch(url + 'users/' , {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            } 
        });
        const json = await res.json()
        return JSON.stringify(json);
        }
    catch (e) {
        console.log('error: ', e);
      }
  }

export async function createUser(username) {
    try{
        const res = await fetch(url + 'users/' , {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: username}) 

        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
    }
  }  


export async function getuserObjByUserID(userID) {
    try{    
        const res = await fetch(url + 'users/' + userID , {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            } 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
    }
  }

export async function updateUserNameByUserID(userID,newname) {
    try{    
        const res = await fetch(url + 'users/' + userID , {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newname})
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

        catch (e) {
            console.log('error: ', e);
        }
  }

export async function deleteuserByUserID(userID) {
    try{
        const res = await fetch(url + 'users/' + userID , {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            } 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }  


export async function getListIDsByUserID(userID) {
    try{
        const res = await fetch(url + 'users/' + userID + '/lists' , {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            } 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }

  
export async function createListByUserID(userID, listname) {
    try{
        const res = await fetch(url + 'users/' + userID + '/lists', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: listname})
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
    }
  }



export async function getListObjByUserAndListID(userID,listID) {
    try{
        const res = await fetch(url + 'users/' + userID + '/lists/' +listID , {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            } 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }

export async function updateListnameByUserAndListID(userID,listID,listname) {
    try{
        const res = await fetch(url + 'users/' + userID + '/lists/' +listID , {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: listname}) 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }

export async function deleteListObjByUserAndListID(userID,listID) {
    try{
        const res = await fetch(url + 'users/' + userID + '/lists/' +listID , {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            } 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }  


export async function getTaskIDsByUserAndListID(userID,listID) {
    try{
        const res = await fetch(url + 'users/' + userID + '/lists/' +listID +'/tasks' , {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            } 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }


export async function createTaskByUserAndListID(userID,listID,taskname) {
    try{
        const res = await fetch(url + 'users/' + userID + '/lists/' +listID +'/tasks' , {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: taskname}) 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }


export async function getTaskObjByUserAndListAndTaskID(userID,listID,taskID) {
    try{
        const res = await fetch(url + 'users/' + userID + '/lists/' +listID +'/tasks/'+taskID , {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            } 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }

export async function updateTaskName_done_ByUserAndListAndTaskID(userID,listID,taskID,taskname,taskdone) {
    try{
        const res = await fetch(url + 'users/' + userID + '/lists/' +listID +'/tasks/'+taskID , {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:taskname,done:taskdone})
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }


export async function deleteTaskObjByUserAndListAndTaskID(userID,listID,taskID) {
    try{
        const res = await fetch(url + 'users/' + userID + '/lists/' +listID +'/tasks/'+taskID , {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            } 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }  

  
export async function getMultiuser() {
    try{
        const res = await fetch(url + 'multiuser/' , {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            } 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }


export async function getMax_IDs() {
    try{
        const res = await fetch(url + 'max_ids/' , {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            } 
        });
        const json = await res.json()
        return JSON.stringify(json);
    }

    catch (e) {
        console.log('error: ', e);
      }
  }  

  