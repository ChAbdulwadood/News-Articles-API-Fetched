const apiKey = "a6de905dedd64cafa037558b38bbe096";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
   try {
      const apiURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
      const response = await fetch(apiURL);
      const data = await response.json();
      return data.articles;
   } catch (error) {
      console.error("Error Fetching Random news", error);
      return [];
   }
}

searchButton.addEventListener("click" , async ()=>{
   const query = searchField.value.trim()
   if(query !== ""){
      try{
const articles = await fetchNewsQuery(query)
displayBlogs(articles)
      }catch(error){
         console.log("Error Fetching news by query",error)
      }
   }
})
async function fetchNewsQuery(query){
   try {
      const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
      const response = await fetch(apiURL);
      const data = await response.json();
      return data.articles;
   } catch (error) {
      console.error("Error Fetching Random news", error);
      return [];  
   }
}

function displayBlogs(articles) {
   blogContainer.innerHTML = "";
   articles.forEach((article) => {
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");

      const img = document.createElement("img");
      img.src = article.urlToImage;
      img.alt = article.title;

      const title = document.createElement("h2");
      const truncatedTitle = article.title.length > 30
         ? article.title.slice(0, 30) + "...."
         : article.title;
      title.textContent = truncatedTitle;
      const discription = document.createElement("p");
      const truncatedDes = article.description.length > 120
         ? article.description.slice(0, 120) + "...."
         : article.discription;
discription.textContent = truncatedDes;
      blogCard.appendChild(img);
      blogCard.appendChild(title);
      blogCard.appendChild(discription);
      blogCard.addEventListener("click", ()=>{
         window.open(article.url, "_blank");
      })
      blogContainer.appendChild(blogCard); // Append blogCard to blogContainer
   });
}

(async () => {
   try {
      const articles = await fetchRandomNews();
      displayBlogs(articles);
   } catch (error) {
      console.error("Error Fetching Random news", error);
   }
})();
