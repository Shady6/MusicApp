import { loadAllUserTracks } from "./track_actions.js";
import { insertTrackIntoHTML } from "./DOM_fav_tracks_creator.js";
import { getViewportWidth } from "../utils/window_utils.js";

const pageInputSearchDelay = 400;
const keywordInputSearchDelay = 400;

let sortAscending = true;

let vw = 0;

const minTracksOnPage = 2;
const maxTracksOnPage = 8;
export let tracksOnPage = maxTracksOnPage;
let tracks = [];
let tracksCopy = [];
export let currentPage = 0;
let controlsHidden = false;

const controls = $("#pagination-controls");

let dispatchedFirstTracksRendered = false;

$(document).ready(() => {
  wrapper();
});

const wrapper = async () => {
  tracks = JSON.parse(await loadAllUserTracks());

  tracksCopy = [...tracks];

  vw = getViewportWidth();
  setTracksOnPageNumber();

  createAllPageNumbers();
  rerender();

  setResizeListener();
  setControlsListeners();
};

export const goToPage = (pageNum) => {
  if (
    pageNum === 0 ||
    (pageNum >= 0 && pageNum <= ((tracks.length - 1) / tracksOnPage))
  ) {
    currentPage = pageNum;
    rerender();
  }
};

const higlightCurrentPage = () => {
  $(`#pageNum${currentPage}`).addClass("bg-primary rounded");
};

const removeHighlightsFromPages = () => {
  $("#pages")
    .children()
    .each((i, child) => {
      $(child).removeClass("bg-primary");
    });
};

const createAllPageNumbers = () => {
  const pagesCount = Math.ceil(tracks.length / minTracksOnPage);
  for (let i = 0; i < pagesCount; i++) {
    $("#pages").append(
      `<span class="pageNum px-2 py-1 d-none" id="pageNum${i}">${i + 1}</span>`
    );
    $("#pages").append(
      `<span id="spread-between-page-nums${i}" class="d-none">...</span>`
    );
  }
};

const renderPageNumbers = () => {
  const pagesCount = Math.ceil(tracks.length / tracksOnPage);
  if (pagesCount <= 6) {
    showPageNumbers(
      Array.from(Array(pagesCount), (_, i) => (i + 1).toString())
    );
  } else if (currentPage <= 2) {
    showPageNumbers(["1", "2", "3", "4", "...", pagesCount.toString()]);
  } else if (currentPage >= pagesCount - 3)
    showPageNumbers([
      "1",
      "...",
      (pagesCount - 3).toString(),
      (pagesCount - 2).toString(),
      (pagesCount - 1).toString(),
      pagesCount.toString(),
    ]);
  else
    showPageNumbers([
      "1",
      "...",
      currentPage.toString(),
      (currentPage + 1).toString(),
      (currentPage + 2).toString(),
      "...",
      pagesCount.toString(),
    ]);
};

const hidePageNumbers = () => {
  $("#pages")
    .children()
    .each((i, child) => {
      $(child).addClass("d-none");
    });
};

const showPageNumbers = (pagesNumsValues) => {
  for (let i = 0; i < pagesNumsValues.length; i++) {
    if (isNaN(parseInt(pagesNumsValues[i])))
      $(`#spread-between-page-nums${pagesNumsValues[i - 1]}`).removeClass(
        "d-none"
      );
    else $(`#pageNum${pagesNumsValues[i] - 1}`).removeClass("d-none");
  }
};

const rerender = () => {
  clear();
  renderControlsAndTracks();
  hidePageNumbers();
  renderPageNumbers();
  removeHighlightsFromPages();
  higlightCurrentPage();
};

const renderControlsAndTracks = () => {
  if (tracks.length > 0) {
    $(".no-tracks-added-info").hide();
    showControls();
    const firstTrackOfCurrentPageIndex = currentPage * tracksOnPage;
    const lastTrackOfCurrentPageIndex = (currentPage + 1) * tracksOnPage;
    const firstTrackOfPrevPageIndex =
      firstTrackOfCurrentPageIndex - tracksOnPage;
    for (
      let i =
        firstTrackOfPrevPageIndex >= 0
          ? firstTrackOfPrevPageIndex
          : firstTrackOfCurrentPageIndex;
      i < lastTrackOfCurrentPageIndex + tracksOnPage && i < tracks.length;
      i++
    )
      insertTrackIntoHTML(
        i,
        tracks[i],
        i >= firstTrackOfCurrentPageIndex && i < lastTrackOfCurrentPageIndex
      );

    if (!dispatchedFirstTracksRendered) {
      dispatchedFirstTracksRendered = true;
      document.dispatchEvent(new Event("onFirstTracksRendered"));
    }
  }
};

const showControls = () => {
  if (!controls.is(":visible")) {
    controls.addClass("d-flex");
    controls.removeClass("d-none");
  }
};

const clear = () => {
  $("#track-list-container").empty();
};

const setResizeListener = () => {
  window.onresize = () => {
    let prevTracksOnPage = tracksOnPage;
    vw = getViewportWidth();
    setTracksOnPageNumber();

    if (prevTracksOnPage != tracksOnPage) {
      rerender();
    }
  };
};

const setTracksOnPageNumber = () => {
  if (vw < 576) tracksOnPage = Math.round((maxTracksOnPage * 1) / 4);
  else if (vw < 768) tracksOnPage = Math.round((maxTracksOnPage * 1) / 2);
  else if (vw < 992) tracksOnPage = Math.round((maxTracksOnPage * 3) / 4);
  else tracksOnPage = Math.round(maxTracksOnPage);
};

const setControlsListeners = () => {
  $("#nextPage").on("click", () => {
    goToPage(currentPage + 1);
  });

  $("#prevPage").on("click", () => {
    goToPage(currentPage - 1);
  });

  $(".pageNum").on("click", (pageNumElementEvent) => {
    goToPage(parseInt(pageNumElementEvent.target.innerHTML) - 1);
  });

  $("#go-to-page-input").on("input", (e) => {
    handleInputAfterDelay(e, pageInputSearchDelay, () => {
      goToPage(parseInt($(e.target).val()) - 1 || 0);
    });
  });

  $("#keyword-search-input").on("input", (e) => {
    handleInputAfterDelay(e, keywordInputSearchDelay, () => {
      keywordSeachHandler($(e.target).val());
    });
  });

  $("#sort-by").on("change", (e) => {
    selectSortingTypeHandler($(e.target).val());
  });

  $("#sort-ascending").on("click", () => {
    sortDirectionButtonHandler(true);
  });

  $("#sort-descending").on("click", () => {
    sortDirectionButtonHandler(false);
  });
};

const sortDirectionButtonHandler = (sortAsc) => {
  sortAscending = sortAsc;
  if (sortAsc) {
    $("#sort-ascending").addClass("text-primary");
    $("#sort-descending").removeClass("text-primary");
  } else {
    $("#sort-ascending").removeClass("text-primary");
    $("#sort-descending").addClass("text-primary");
  }
  selectSortingTypeHandler($("#sort-by").val());
};

const selectSortingTypeHandler = (sortingType) => {
  const keyword = $("#keyword-search-input").val();

  if (!keyword) {
    sortTracks(tracksCopy, sortingType);
    tracks = [...tracksCopy];
    rerender();
  } else {
    sortTracks(tracksCopy, sortingType);
    keywordSeachHandler(keyword, currentPage);
  }
};

const keywordSeachHandler = (keyword, pageNum = null) => {
  if (!keyword) {
    tracks = [...tracksCopy];
    goToPage(currentPage);
  } else {
    tracks = tracksCopy.filter((track) => {
      return (
        `${track.Title} ${track.Artist.Name} ${track.Album.Title} ${track.ReleaseDate}`
          .toLocaleLowerCase()
          .indexOf(keyword.toLocaleLowerCase()) >= 0
      );
    });
    goToPage(pageNum ? pageNum : 0);
  }
};

const handleInputAfterDelay = (e, delay, handler) => {
  let inputValue = $(e.target).val();

  setTimeout(() => {
    if (inputValue === $(e.target).val()) handler();
  }, delay);
};

const getPropertyFromStringPath = (obj, stringPath) => {
  return stringPath.split(".").reduce((p, c) => (p && p[c]) || null, obj);
};

export const deleteTrackFromMemory = (trackTitle) => {
  tracks = tracks.filter((track) => track.Title !== trackTitle);
  if (currentPage > Math.floor((tracks.length - 1) / tracksOnPage))
    goToPage(currentPage - 1);
  else rerender();
};

const sortTracks = (tracksToSort, sortingType) => {
  tracksToSort.sort((track1, track2) => {
    const propertyA = getPropertyFromStringPath(track1, sortingType);
    const propertyB = getPropertyFromStringPath(track2, sortingType);

    if (typeof propertyA === "string")
      return propertyA.localeCompare(propertyB);
    else return propertyA - propertyB;
  });

  if (!sortAscending) tracksToSort.reverse();
};

export const getTracksLength = () => {
  return tracks.length;
};
