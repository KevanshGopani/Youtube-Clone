let api_key = "";

const videoCardContainer = document.querySelector(".card");

const videoDetailPage = document.querySelector(".video-list");
const videocommets = document.querySelector(".comments");
let searchButton = document.querySelector(".search-btn");

let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
let searchLink = "https://www.youtube.com/results?search_query=";

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));
const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;

      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  let title = data.snippet.title;
  title = title.substr(0, 30);
  videoCardContainer.innerHTML += `
  <div class="cards ${data.id}" onclick="video('${data.id}')">
                <div class="videoData">
                <img
                  src="${data.snippet.thumbnails.high.url}"
                  alt="logo"
                  class="thumbnails"
                />
                <p class="duration"></p>
              </div>
              <div class="videodetails">
                <div class="profilePhoto">

                  <img
                src="${data.channelThumbnail}"
                  alt="logo"
                  class="thumbnails"
                />
              </div>
                <div class="details">
                  <div class="title">
                  <p class="titleName">${title}</p>
                  </div>
                  <div class="info">
                  <p class="p1">${data.snippet.channelTitle}</p>
                  
                  </div>
                </div>
              </div>
              </div>   
    `;
};
function video(id) {
  location.href = `https://www.youtube.com/watch?v=${id}`;
}
// search bar

function getValue() {
  let searchInput = document.querySelector(".search-box");
  return searchInput.value;
}

searchButton.addEventListener("click", () => {
  let data = getValue();

  if (data.length) {
    location.href = searchLink + data;
  }
});
