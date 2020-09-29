const update = document.querySelector('#update-button')

function changeSide(_id,side = 'light'){
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: _id,
            name: side == 'dark' ? 'Darth Vader' : 'Yoda',
            quote: side == 'dark' ? 'I find your lack of faith disturbing.' : 'In a dark place we find ourselves, and a little more knowledge lights our way.' 
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
}

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

function deleteComment(_id){
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: _id
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No quote to delete') {
            messageDiv.textContent = 'No quote to delete'
        } else {
            window.location.reload(true)
        }      
    })    
}

function subComment(id){    
    const name = document.getElementById('name_'+id).value;
    const quote = document.getElementById('comment_'+id).value;
    fetch('/subcomment', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
            name: name,
            quote: quote
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
}

function openCommentBox(id) {      
    let commentBox = document.getElementById('subcomment_'+id);    
    commentBox.className = 'post-comments show'    
}