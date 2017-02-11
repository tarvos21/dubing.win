var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

//    'player' is the element's id this iframe will be in.

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    //videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //event.target.playVideo();
  event.target.cuePlaylist
    ({
      listType: 'playlist',
      list:"PLya0UkqAf0pLPeCk--_O1GILTqC59B4t5",
      //list: 'PLH30k6CwlcgK8C-LET6_ZrAWwYGLqT8R-',
      suggestedQuality:'default',
      autoplay: 1,
      index:0,
    });
  event.target.setLoop();
  player.mute();
}

function onPlayerStateChange(event)
{
  if(event.data == YT.PlayerState.CUED)
  {
    videoList = event.target.getPlaylist();

    // to prevent adding new video and for the randomize
    videoCount = videoList.length; 

    // get the ids before randomize playlist, send it
    sendIds(videoList);

    var num = getRandom(0,videoCount);
    // starting the player (like autoplay)
    event.target.playVideoAt(num);
    console.log(num);
  }

  // randomize at each video ending
  if(event.data == YT.PlayerState.ENDED)
  {
    var num = getRandom(1,videoCount);
    event.target.playVideoAt(num);
  }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sendIds(ids)
{
  console.log(ids);
  // make what you want to do with them... ajax call to your php
}

/*
  var index = Math.floor(Math.random() * 100);
  console.log(index);
  player.cuePlaylist({
    //list:"PLGVZCDnMOq0rjkF7p_F4qtaVJQnjK1oKT",
    //listType:"playlist",
    listType:"playlist",
    list:"PLya0UkqAf0pLPeCk--_O1GILTqC59B4t5",
    //list:"python",
    //listType:"search",
    //list:"sentdex",
    //listType:"user_uploads",
    index:index,
    startSeconds:0,
    suggestedQuality:"default"});

*/
//  player.playVideo();
/*
  player.loadPlaylist({
    //list:"PLGVZCDnMOq0rjkF7p_F4qtaVJQnjK1oKT",
    //listType:"playlist",
    list:"PLya0UkqAf0pLPeCk--_O1GILTqC59B4t5",
    listType:"playlist",
    //list:"python",
    //listType:"search",
    //list:"sentdex",
    //listType:"user_uploads",
    index:2,
    startSeconds:0,
    suggestedQuality:"default"});
*/
//}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
/*
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 30000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
*/
