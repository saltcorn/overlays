var overlayStyleSheet = document.createElement("style");
overlayStyleSheet.textContent = `
.scviewoverlay-bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
`;
document.head.appendChild(overlayStyleSheet);

function activate_view_overlay({
  state,
  view,
  location,
  height,
  height_units,
  width,
  width_units,
}) {
  const url = `/view/${view}?${state}`;
  let locclass;
  switch (location) {
    case "Bottom right":
    default:
      locclass = "scviewoverlay-bottom-right";
      break;
  }
  let styleStr = "";
  if (height) styleStr += `height: ${height}${height_units || "px"}`;
  if (width) styleStr += `width: ${height}${height_units || "px"}`;
  $.ajax(url, {
    headers: {
      localizedstate: "true",
    },
    success: function (res, textStatus, request) {
      console.log({ res });

      $("body").append(`<div class="scviewoverlay ${locclass}">${res}</div>`);
    },
  });
}
