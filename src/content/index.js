import { setChats } from "./api";
import Mark from "mark.js";
let url = location.href

if (url.includes('chat.openai.com')) {

  addSearchBar()

  setChats()

  // Search history bar
  function addSearchBar() {
    const nav = document.querySelector('nav')
    if (nav.querySelector('#search-input')) return

    const searchBar = document.createElement('div')
    searchBar.innerHTML = `
      <div class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm flex-shrink-0 border border-white/20">
        <button id="search-button" class="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
        <input type="text" id="search-input" placeholder="Search..." class="text-sm focus:ring-0 focus-visible:ring-0" style="background-color: transparent; border: none; padding: 0; flex-grow: 1;">
      </div>  
    `

    // Insert the search bar before the first child of the nav
    nav.prepend(searchBar)

    const searchButton = document.getElementById('search-button')
    const searchInput = document.getElementById('search-input')

    // Clicking the search button triggers the search
    searchButton.addEventListener('click', () => {

      var contextUnmark = document.querySelector(".scrollbar-trigger");
      var instanceUnmark = new Mark(contextUnmark);
      instanceUnmark.unmark();

      var contextUnmark = document.querySelector('[role="presentation"]');
      var instanceUnmark = new Mark(contextUnmark);
      instanceUnmark.unmark();
      
      const searchTerm = searchInput.value.toLowerCase()
      const navAnchors = nav.querySelectorAll('div > a')
      const chats = JSON.parse(localStorage.getItem("chats"))
      let chatHeads = []
      chats?.forEach(chat => {
        const { mapping, title } = chat
        const conv = Object.values(mapping).map((section) => {
          return section?.message?.content?.parts
        })
        let totalConversation = ""
        conv?.forEach(convo => {
          totalConversation += convo?.[0] ? convo[0] : ""
          totalConversation += " "
        })
        chatHeads.push({
          title,
          chats: totalConversation
        })
      });

      var options = {
        accuracy: "exactly",
        separateWordSearch: false,
      };

      chatHeads?.forEach(({ title, chats}) => {
        if(chats.includes(searchTerm)) {
          let context = document.querySelector(".scrollbar-trigger");
          let instance = new Mark(context);
          instance.mark(title,options);
        }
      })
      let context = document.querySelector('[role="presentation"]')
      let instance = new Mark(context);
      instance.mark(searchTerm);

    })
  }

  const nextDiv = document.getElementById('__next')

  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList)
      if (mutation.type === 'childList' && mutation.target === nextDiv) {
        addSearchBar()
        break
      }
  })

  observer.observe(nextDiv, { childList: true, subtree: true })
}
