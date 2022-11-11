/**
 * @author Dáger Zúñiga <dagerzuga@gmail.com>
 */

/**
 * Init the feature that shows, hides, and controls the favorite links on the sidebar.
 * This "favorite links" section is located above the normal links and below the search bar.
 * The data of the favorite links are saved in local storage. Technically there is no
 * limit to the number of pages that can be favorites.
 * This secion lives in "layouts/partials/favorites.html", and the button to remove and/or add
 * elements lives in "layouts/partials/title.html".
 */

/**
 * Example of local storage object "favorites" with valid data:
 * [
 *  { page: "Features", link: "/features/" },
 *  { page: "Some buttons", link: "/some-buttons/" },
 * ]
 */

(function initFavorites() {

  /**
   * Text labels for the button that adds and removes elements
   */
  const REMOVE_FROM_FAVORITES_LABEL = 'Remove from favorites';
  const ADD_TO_FAVORITES_LABEL = 'Add to favorites';

  /**
   * The container itself of the whole component and the "ul" list where all the links are displayed
   */
  const favoriteLinksContainer = document.querySelector('.js-favorite-links');
  const favoriteLinksContainerList = document.querySelector('.js-favorite-links-list');

  /**
   * This is the button itself that adds or removes a favorite element from local storage.
   */
  const toggleFavoriteButton = document.querySelector('.js-toggle-favorite-btn');

  /**
   * This is the text that says either "Remove from favorites" if the page is already a favorite,
   * or "Add to favorites" if the page is not a favorite link. This is empty by default.
   */
  const toggleFavoriteButtonText = document.querySelector('.js-toggle-favorite-text');

  /**
   * The URL of the current page in this format: "/features/"
   * without the double quotes.
   */
  const currentURL = window.location.pathname;

  /**
   * By default, all pages are considered as no-favorite, but this changes as soon as this file runs.
   */
  let isFavorite = false;

  /**
   * Shows or hides the section on the sidebar that contains the favorite links.
   * First, it checks if the local storage object with the favorites exists. If the object doesn't exist,
   * then it's not necessary to do something because the section is hidden by default.
   * If it finds something then proceeds to append all the links to the empty container.
   * This function is called "reload" and not "init" because is going to be called again after a new element
   * is added or removed.
   */
  function reloadFavoriteLinks() {
    const favoriteLinks = localStorage.getItem('favorites');

    // @ts-ignore
    // Adding this "ignore" here because the code editor can throw a warning about favoriteLinks being null.
    const favoriteLinksObject = JSON.parse(favoriteLinks);

    /**
     * There are three possible scenarios:
     * 1- There is no local storage object at all.
     * 2- There is a local storage object but is empty.
     * 3- There is a local storage object with data.
     * The if checks for the third scenario in order to add the content.
     */
    if (favoriteLinksObject?.length) {
      favoriteLinksContainer?.classList.remove('d-none');

      if (favoriteLinksContainerList) {

        /**
         * Cleaning up the section to avoid repeated content when adding new elements.
         */
        favoriteLinksContainerList.innerHTML = '';

        favoriteLinksObject.forEach(item => {
          /**
           * Adding the "active" class to the link if the link is also the current page
           */
          const activeClass = item.link === currentURL ? 'active' : '';
          favoriteLinksContainerList.innerHTML += `
            <li class="nav-item">
              <a class="nav-link p-0 justify-content-start align-items-baseline ${activeClass}" href="${item.link}">
                <i class="nav-link__icon mr-1 fa fa-arrow-right"></i>
                <h6>${item.page}</h6>
              </a>
            </li>
          `;
        });
      }
    } else {
      cleanFavoriteLinksContainer();
    }
  }

  /**
   * If an element was removed and then now there are 0 elements in the favorite
   * object then the container of the favorites needs to be hidden and the "ul"
   * needs to be cleaned.
   */
  function cleanFavoriteLinksContainer() {
    favoriteLinksContainer?.classList.add('d-none');
    // @ts-ignore
    // Adding this "ignore" here because the code editor can throw a warning about favoriteLinksContainerList being null.
    favoriteLinksContainerList.innerHTML = '';
  }

  /**
   * This reloads the text that says "Remove from favorites" or "Add to favorites" after an element is
   * added or removed. This function is called "reload" and not "init" because this is going to be called
   * every time this action - add or remove - happens.
   * The actual update of the text happens in "updateToggleLinkButtonText", function that is called in this method.
   */
  function reloadToggleLinkButtonText() {
    const favoriteLinks = localStorage.getItem('favorites');

    /**
     * If there are no elements then the page is not part of the favorites.
     */
    if (favoriteLinks) {
      const favoriteLinksObject = JSON.parse(favoriteLinks);

      const isThisInFavorites = favoriteLinksObject.filter(item => {
        return item.link === currentURL
      }).length;

      /**
       * This is the global variable declared at line 56
       */
      isFavorite = isThisInFavorites;
      updateToggleLinkButtonText(isThisInFavorites);
    } else {
      if (toggleFavoriteButtonText) toggleFavoriteButtonText.innerHTML = ADD_TO_FAVORITES_LABEL;
    }
  }

  /**
   * Update the text of the button that adds or remove pages from favorites.
   * @param {boolean} isThisInFavorites determines if the current page is in favorites or not
   */
  function updateToggleLinkButtonText(isThisInFavorites) {
    const textForButton = isThisInFavorites ? REMOVE_FROM_FAVORITES_LABEL : ADD_TO_FAVORITES_LABEL;
    if (toggleFavoriteButtonText) toggleFavoriteButtonText.innerHTML = textForButton;
  }

  /**
   * Inits and control the functionality to remove or add elements from the "favorite" object in local storage.
   * There is one button for both actions so the action depends on the "isFavorite" variable declared in line 56.
   * If for whatever reason, the page doesn't have a title, the page won't be added to favorites.
   */
  function initToggleLinkButton() {
    toggleFavoriteButton?.addEventListener('click', () => {
      const pageTitle = document.querySelector('.js-title')?.innerHTML;
      if (pageTitle) {
        isFavorite ? removeFavoriteLink(pageTitle) : addFavoriteLink(pageTitle);
        reloadToggleLinkButtonText();
        reloadFavoriteLinks();
      }
    });
  }

  /**
   * Adds the current page to local storage as part of the existing data.
   * This doesn't remove data prior to this action.
   * @param {string} pageName the name of the page as it appears in the H1 element
   */
  function addFavoriteLink(pageName) {
    const newItem = { page: pageName, link: currentURL }
    const favoriteLinks = localStorage.getItem('favorites');
    const favoriteLinksObject = favoriteLinks ? JSON.parse(favoriteLinks) : [];

    favoriteLinksObject.push(newItem)
    localStorage.setItem('favorites', JSON.stringify(favoriteLinksObject));
  }

  /**
   * Removes the current page from the local storage object.
   * @param {string} pageTitle the name of the page as it appears in the H1 element
   */
  function removeFavoriteLink(pageTitle) {
    const favoriteLinks = localStorage.getItem('favorites');
    if (favoriteLinks) {
      const favoriteLinksObject = JSON.parse(favoriteLinks);
      const newFavoriteLinks = favoriteLinksObject.filter( item => {
        return item.page !== pageTitle
      });

      localStorage.setItem('favorites', JSON.stringify(newFavoriteLinks));
    }
  }

  reloadFavoriteLinks();
  reloadToggleLinkButtonText();
  initToggleLinkButton();
})();
