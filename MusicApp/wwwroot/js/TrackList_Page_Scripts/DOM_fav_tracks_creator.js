export const insertTrackIntoHTML = (i, track, isVisible) => {
  let parentDivId = "track-card-wrapper-" + i;
  let searchQuery = track.Title + " " + track.Artist.Name;

  let trackCardHTML = createTrackCardHTML(parentDivId, searchQuery, track, isVisible);

  $("#track-list-container").append(trackCardHTML);
};

const createTrackCardHTML = (parentDivId, searchQuery, track, isVisible) => {
  return `
  <div class="${isVisible ? "" : "d-none"} image-card-wrapper col-lg-3 col-md-4 col-sm-6 col-12" id="${parentDivId}">
            <div class="hovereffect">            
							<img class="" src="${track.Album.Cover_Big}" alt="">
							<div class="overlay d-flex flex-column justify-content-around">
							${createTrackAboutOverlay(track)}
								<div class="d-flex flex-column justify-content-between">									
										${createTrackLinksOverlay(searchQuery, track.DeezerLink)}          
                  ${createTrackActionsOverlay(track, parentDivId)}
								</div>
							</div>
						</div>
					</div>	
  `;
};

export const createTrackAboutOverlay = (track) => {
  return `
  <div class="track-info">
  <p><span class="track-title">${track.Title}</span> by <span class="track-author">${track.Artist.Name}</span></p>
  <p><span class="track-album">${track.Album.Title}</span></p>
</div>`;
};

export const createTrackActionsOverlay = (track, parentDivId) => {
  return `
  <p class="track-actions disabled-link-mobile">
  <i class="fa fa-play" track-src="${track.Preview}" aria-hidden="true"></i>
  <i class="fa fa-pause" style="display:none;" aria-hidden="true"></i>
  <i class="fa fa-repeat" aria-hidden="true"></i>
  <i parent-wrapper-id="${parentDivId}" track-title="${track.Title.replace(
    /"/g,
    "&quot;"
  )}" class="fa fa-trash" aria-hidden="true"></i>
</p>`;
};

export const createTrackLinksOverlay = (searchQuery, deezerLink) => {
  return `
  <p class="track-links disabled-link-mobile">
	  <a target="_blank" href="${"https://open.spotify.com/search/" + searchQuery}">
	  <i class="fa fa-spotify" aria-hidden="true"></i>
  </a>
  <a target="_blank" href="${
    "https://www.youtube.com/results?search_query=" + searchQuery
  }">
	  <i class="fa fa-youtube" aria-hidden="true"></i>
  </a>
  <a target="_blank" href="${"https://soundcloud.com/search?q=" + searchQuery}">
	  <i class="fa fa-soundcloud" aria-hidden="true"></i>
  </a>
  <a target="_blank" href="${
    "https://listen.tidal.com/search?q=" + searchQuery
  }">
  <svg class="svg-logo" version="1.1" id="Warstwa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  width="176px" height="177px" viewBox="0 0 176 177" enable-background="new 0 0 176 177" xml:space="preserve">
  <g>
	 <g>
		 <path d="M-0.489,59.215L28.787,88.42l29.276-29.205L28.787,30.011L-0.489,59.215z M58.224,59.215L87.5,88.42l29.276-29.205
		 L87.5,30.011L58.224,59.215z M146.213,30.011l-29.276,29.205l29.276,29.205l29.276-29.205L146.213,30.011z M58.224,117.784
		 L87.5,146.989l29.276-29.205L87.5,88.58L58.224,117.784z"/>
	 </g>
  </g>
  </svg>
  </a>
  <a target="_blank" href="${deezerLink}">
  <svg version="1.1" class="svg-logo deezer-logo"
  id="Calque_1" inkscape:version="0.92.4 (5da689c313, 2019-01-14)" sodipodi:docname="index.svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 191.2"
  style="enable-background:new 0 0 1000 191.2;" xml:space="preserve">

<g id="g8252" transform="translate(-230,86.843818)">
<path id="path8175" inkscape:connector-curvature="0" d="M234.1,40.1c0,40.1,24.7,64.1,61.4,64.1c18.3,0,33.7-5.1,42.3-18.5v18.5
 h33.5V-86.8h-34.8v81.2c-7.9-13.4-22.5-19.4-40.8-19.4C259.9-25.1,234.1-0.6,234.1,40.1L234.1,40.1z M337.6,40.1
 c0,22.9-15.6,37.2-34.3,37.2c-19.4,0-34.3-14.3-34.3-37.2c0-23.3,15-37.9,34.3-37.9C322,2.2,337.6,17,337.6,40.1z" />

<path id="path8177" inkscape:connector-curvature="0" d="M479.6,54.9c-4,14.8-14.1,22.2-30,22.2c-18.5,0-33.7-11.2-34.1-31h87.7
 c1.1-4.9,1.6-10.1,1.6-15.8c0-35.5-24.2-55.5-59.9-55.5c-38.1,0-64.3,27.1-64.3,63.9c0,41,28.9,65.6,68.9,65.6
 c30.2,0,50.7-12.6,59.7-37.7L479.6,54.9z M415.5,22.9C418.8,8.6,430.7,0.2,445,0.2c15.6,0,26.2,8.4,26.2,21.6l-0.2,1.1H415.5z" />

<path id="path8179" inkscape:connector-curvature="0" d="M608.7,54.9c-4,14.8-14.1,22.2-30,22.2c-18.5,0-33.7-11.2-34.1-31h87.7
 c1.1-4.9,1.6-10.1,1.6-15.8c0-35.5-24.2-55.5-59.9-55.5c-38.1,0-64.3,27.1-64.3,63.9c0,41,28.9,65.6,68.9,65.6
 c30.2,0,50.7-12.6,59.7-37.7L608.7,54.9z M544.6,22.9c3.3-14.3,15.2-22.7,29.5-22.7c15.6,0,26.2,8.4,26.2,21.6l-0.2,1.1H544.6z" />

<path id="path8181" inkscape:connector-curvature="0" d="M756.7,104.4V72.9h-73.1l71.1-69.2v-28.8H642.2v30h68.7L640,74.4v30H756.7
 z" />

<path id="path8183" inkscape:connector-curvature="0" d="M858.4,54.9c-4,14.8-14.1,22.2-30,22.2c-18.5,0-33.7-11.2-34.1-31H882
 c1.1-4.9,1.6-10.1,1.6-15.8c0-35.5-24.2-55.5-59.9-55.5c-38.1,0-64.3,27.1-64.3,63.9c0,41,28.9,65.6,68.9,65.6
 c30.2,0,50.7-12.6,59.7-37.7L858.4,54.9z M794.3,22.9c3.3-14.3,15.2-22.7,29.5-22.7c15.6,0,26.2,8.4,26.2,21.6l-0.2,1.1H794.3z" />


<path id="path8250" inkscape:connector-curvature="0" d="M966.1,19.6c0,1.3,0,3.7,0,3.7h33.9c0,0,0-6.4,0-9.9
 c0-22.2-13.9-38.3-37.2-38.3c-15,0-25.6,7.3-31.1,19.4v-19.4h-35v129.3h35V21.1c0-13.2,7.1-20.5,18-20.5
 C959.7,0.7,966.1,10.1,966.1,19.6z" />

</g>
</svg>
  </a>
  </p>`;
};
