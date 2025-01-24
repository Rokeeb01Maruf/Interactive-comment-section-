let addComment = document.querySelector('.comment')
let createComment = document.querySelector('.create-comment')
const container = document.querySelector('.container')
const post = document.querySelector('.post')
const replyComment = document.querySelector('.reply-comments')

async function commentf() {
    let data = await fetch('data.json');
    let file = await data.json()
    let commented = file.comments
    commented.forEach(e => {
        let dataComment = post.cloneNode(true)
        dataComment.style.display='flex';
        let comment = dataComment.querySelector('.comment')
        comment.style.display='flex'
        let profilePics = dataComment.querySelector('.pics img')
        profilePics.src = e.user.image.png
        let comments = dataComment.querySelector('.comment-details p')
        comments.textContent = e.content
        let time = dataComment.querySelector('.time')
        time.textContent = e.createdAt
        let score = dataComment.querySelector('.score p')
        score.textContent = e.score
        let name = dataComment.querySelector('.profile-name')
        name.textContent = e.user.username
        let replyBtn = dataComment.querySelector('.reply')
        let replyIn = dataComment.querySelector('.create-reply')
        replyBtn.addEventListener('click', (e)=>{
            let rep = replyIn.cloneNode(true)
            rep.style.display='flex'
            let allDetails = rep.querySelector('.create-reply textarea')
            dataComment.appendChild(rep)
            let contents
            let submitBtn = rep.querySelector('.create-reply button')
            submitBtn.onclick = ()=>{
                contents = allDetails.value
                let newReply = replyComment.cloneNode(true)
                newReply.style.display='flex'
                let pics = newReply.querySelector('.pics img');
                pics.src = file.currentUser.image.png
                let name = newReply.querySelector('.profile-name')
                name.textContent = file.currentUser.username
                let details = newReply.querySelector('.comment-details p')
                details.textContent = contents
                dataComment.appendChild(newReply)
                dataComment.removeChild(rep)
            }
        })
        
        container.insertBefore(dataComment, createComment)

        if(e.replies.length !== 0){
            let me = e.replies
            me.forEach(e =>{
                let commentsReplied = replyComment.cloneNode(true);
                commentsReplied.style.display='flex'
                let commentScore = commentsReplied.querySelector('.score p')
                commentScore.textContent = e.score;
                let commentDetails = commentsReplied.querySelector('.comment-details p')
                commentDetails.textContent = e.content
                let commentTime = commentsReplied.querySelector('.time')
                commentTime.textContent  = e.createdAt
                let commentPics = commentsReplied.querySelector('.pics img')
                commentPics.src = e.user.image.png
                let commenter = commentsReplied.querySelector('.profile-name')
                commenter.textContent = e.user.username

            dataComment.appendChild(commentsReplied)
            });
        }
    });
    let addcommentBtn = document.querySelector('.create-comment button');
    let context = document.querySelector('.create-comment #input')
    let div = document.createElement('div')
    let commentContent;
    addcommentBtn.addEventListener('click', ()=>{
        commentContent = context.value 
        let newComment = addComment.cloneNode(true)
        newComment.style.display='flex'
        let picsComment = newComment.querySelector('.pics img')
        picsComment.src = file.currentUser.image.png
        let contentComment  = newComment.querySelector('.comment-details p')
        contentComment.textContent = commentContent
        let nameComment = newComment.querySelector('.profile-name')
        nameComment.textContent  = file.currentUser.username
        div.appendChild(newComment)
        container.insertBefore(div, createComment)
        context.value =''
        let replyBtn = newComment.querySelector('.reply')
        let replyIn = document.querySelector('.create-reply')
        replyBtn.addEventListener('click', (e)=>{
            let rep = replyIn.cloneNode(true)
            rep.style.display='flex'
            let allDetails = rep.querySelector('.create-reply textarea')
            div.appendChild(rep)
            let contents
            let submitBtn = rep.querySelector('.create-reply button')
            submitBtn.onclick = ()=>{
                contents = allDetails.value
                let newReply = replyComment.cloneNode(true)
                newReply.style.display='flex'
                let pics = newReply.querySelector('.pics img');
                pics.src = file.currentUser.image.png
                let name = newReply.querySelector('.profile-name')
                name.textContent = file.currentUser.username
                let details = newReply.querySelector('.comment-details p')
                details.textContent = contents
                div.appendChild(newReply)
                div.removeChild(rep)
            }
        })
    })
}

commentf()