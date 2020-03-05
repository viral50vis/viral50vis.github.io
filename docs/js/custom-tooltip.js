/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
var attrList = document.getElementById("dropdown-container");
var span = document.createElement("SPAN");
span.className = "tooltip-content";
attrList.appendChild(span);

function loadTooltip() {
  var attr = document
    .getElementById("dropdown-container")
    .getElementsByTagName("li");
  for (var i = 0; i < attr.length; i++) {
    attr[i].onmouseover = function() {
      hoverTooltip(this);
    };
    attr[i].onmouseout = function() {
      leaveTooltip(this);
    };
  }
}

function hoverTooltip(ele) {
  var tooltipContent = getTooltipContent(ele.innerHTML);
  var tooltip = document.getElementsByClassName("tooltip-content")[0];
  tooltip.innerHTML = tooltipContent;
  tooltip.style.visibility = "visible";
  alignTooltip(ele, tooltip);
}

function leaveTooltip() {
  var tooltip = document.getElementsByClassName("tooltip-content")[0];
  tooltip.style.visibility = "hidden";
}

function alignTooltip(ele, tooltip) {
  tooltip.style.top =
    ele.offsetTop + ele.clientHeight / 2 - tooltip.clientHeight / 2 + "px";
  tooltip.style.left = ele.clientWidth + 5 + "px";
}

function getTooltipContent(string) {
  var tooltipText = "";

  switch (string) {
    case "acousticness":
      tooltipText = "A confidence measure whether the track is acoustic.";
      break;
    case "danceability":
      tooltipText =
        "Danceability describes how suitable a track is for dancing.";
      break;
    case "energy":
      tooltipText =
        "Energy is a measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.";
      break;
    case "instrumentalness":
      tooltipText = "A measure of whether a track contains no vocals.";
      break;
    case "key":
      tooltipText =
        "The estimated overall key of the track. Integers map to pitches using standard Pitch Class notation . E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.";
      break;
    case "liveness":
      tooltipText = "Measures the presence of an audience in the recording.";
      break;
    case "loudness":
      tooltipText =
        "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.";
      break;
    case "mode":
      tooltipText =
        "Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.";
      break;
    case "speechiness":
      tooltipText =
        "Speechiness detects the presence of spoken words in a track.";
      break;
    case "tempo":
      tooltipText =
        "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.";
      break;
    case "time_signature":
      tooltipText =
        "An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).";
      break;
    case "valence":
      tooltipText = "A measure of musical positiveness conveyed by a track.";
      break;
    case "duration_ms":
      tooltipText = "The duration of the track in milliseconds.";
      break;
    default:
      tooltipText = "Something went wrong...";
  }
  return tooltipText;
}
