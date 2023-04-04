

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';



let shouldDelete=''

let tweetsData = JSON.parse(localStorage.getItem('tweetsData')) || [   
    {
        handle: `@TrollBot66756542 💎`,
        profilePic: `images/troll.jpg`,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },    
    {
        handle: `@Elon ✅`,
        profilePic: `images/musk.png`,
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
        replies: [
                  {
                handle: `@TomCruise ✅`,
                profilePic: `images/tcruise.png`,
                tweetText: `Yes! Sign me up! 😎🛩`,
            },
                  {
                handle: `@ChuckNorris ✅`,
                profilePic: `images/chucknorris.jpeg`,
                tweetText: `I went last year😴`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
        {
        handle: `@NoobCoder12`,
        profilePic: `images/flower.png`,
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML?`,
        replies: [
            {
                handle: `@StackOverflower ☣️`,
                profilePic: `images/overflow.png`,
                tweetText: `No. Obviosuly not. Go get a job in McDonald's.`,
            },
            {
                handle: `@YummyCoder64`,
                profilePic: `images/love.png`,
                tweetText: `You are wonderful just as you are! ❤️`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
        
    },     

  //my default data here
]

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    } else if(e.target.dataset.replyb){
        replybtn(e.target.dataset.replyb)
    } else if(e.target.dataset.del){
        shouldDelete = e.target.dataset.del // Accessing the UUID of the tweet that needs to be deleted.
        deleteTweet()
    }
})
 
function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData))

    render()

}



function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    localStorage.setItem('tweetsData', JSON.stringify(tweetsData))

    render() 
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
   
   
}

function replybtn(tweetId) {
    const targetTweetObj = tweetsData.filter(function(tweet) {
      return tweet.uuid === tweetId
    })[0]
  
    const replayinput = document.getElementById(`reply-input-${tweetId}`)
  
    if (replayinput.value) {
      targetTweetObj.replies.push({
        handle: `USER ✅`,
        profilePic: `images/scrimbalogo.png`,
        tweetText: replayinput.value,
        
      })
      replayinput.value = ''
      
    }

    

    render()
}






function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `USER`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
            isdeleted :false
           
        })
   
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData))
    render()
    tweetInput.value = ''
 
    }

}



function deleteTweet(){
    for (let i = tweetsData.length - 1; i >= 0; i--) {
        if (shouldDelete === tweetsData[i].uuid) {
            tweetsData.splice(i, 1); // remove the tweet at the current index
            break; // exit the loop since we've found and removed the tweet
        }
    }

    localStorage.setItem('tweetsData', JSON.stringify(tweetsData))
    render()
}








function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
            
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        

        let canDeleteTweetClass = ''
        
        if (tweet.handle === 'USER') {
            // console.log("There a new tweet from @Scrimba!")
            canDeleteTweetClass = 'show'
        }


        feedHtml  += `<div class="delete hidden ${canDeleteTweetClass}">
                
            <p class="deletebtn"  data-del="${tweet.uuid}"  >delete<p>
            
            </div>`






        const userHtml = `
        <div class="replay-input-area">
          <img src="images/scrimbalogo.png" class="profile-pic">
          <textarea placeholder="Tweet your reply" id="reply-input-${tweet.uuid}" class="replay-text"></textarea>
        </div>
        <button class="replybtn" id="reply-button-${tweet.uuid}" data-replyb="${tweet.uuid}">Reply</button>
       
      `
      
      let repliesHtml = userHtml
      
      if (tweet.replies.length > 0) {
        tweet.replies.forEach(function(reply) {
          repliesHtml += `
            <div class="tweet-reply">
              <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                <div>
                  <p class="handle">${reply.handle}</p>
                  <p class="tweet-text">${reply.tweetText}</p>
                </div>
              </div>
            </div>
          `
        })
      }
            

          
        feedHtml += `
        
        
<div class="tweet" id="tweet-${tweet.uuid}">
    
    <div class="tweet-inner"  >
    
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
           <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
   
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>   
</div>

`


   })


   
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}




render()

