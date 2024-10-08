export const orange = {
  5: "#FFF8F2",
  10: "#FFE3CD",
  20: "#FFC89B",
  30: "#FFAC68",
  40: "#FF9136",
  50: "#FF7504",
  60: "#CC5E03",
  70: "#994602",
  80: "#662F02",
  90: "#331701",
};

export const blue = {
  5: "#F3F8FE",
  10: "#CEE5FB",
  20: "#9ECAF7",
  30: "#6DB0F3",
  40: "#3D95EF",
  50: "#0C7BEB",
  60: "#0A62BC",
  70: "#074A8D",
  80: "#05315E",
  90: "#02192F",
};

export const grey = {
  0: "#FFFFFF",
  5: "#F8F8F8",
  10: "#F4F4F4",
  20: "#E9E9E9",
  30: "#BDBDBD",
  40: "#A7A7A7",
  50: "#7A7A7A",
  60: "#646464",
  70: "#4E4E4E",
  80: "#383838",
  90: "#222222",
  100: "#181818",
};

export const red = {
  5: "#FDF6F4",
  10: "#F6D9D3",
  20: "#EEB4A8",
  30: "#E58E7C",
  40: "#DD6951",
  50: "#D44325",
  60: "#AA361E",
  70: "#7F2816",
  80: "#551B0F",
  90: "#2A0D07",
};

export const green = {
  5: "#F2F9F5",
  10: "#CCE6D6",
  20: "#99CDAD",
  30: "#66B385",
  40: "#339A5C",
  50: "#008133",
  60: "#006729",
  70: "#004D1F",
  80: "#003414",
  90: "#001A0A",
};

export const yellow = {
  5: "#FEFCF2",
  10: "#FCF3CD",
  20: "#FAE79B",
  30: "#F7DA68",
  40: "#F5CE36",
  50: "#F2C204",
  60: "#C29B03",
  70: "#917402",
  80: "#614E02",
  90: "#302701",
};

const colors = {
  /************ BG ************/
  // BRAND
  BG_BRAND_WEAKEST: orange[5],
  BG_BRAND_WEAKER: orange[10],
  BG_BRAND_WEAK: orange[40],
  BG_BRAND_NORMAL: orange[50],
  BG_BRAND_STRONG: orange[60],

  //ACCENT
  BG_ACCENT_WEAKEST: blue[5],
  BG_ACCENT_WEAKER: blue[10],
  BG_ACCENT_WEAK: blue[40],
  BG_ACCENT_NORMAL: blue[50],
  BG_ACCENT_STRONG: blue[60],

  // NEGATIVE
  BG_NEGATIVE_WEAKEST: red[5],
  BG_NEGATIVE_WEAKER: red[10],
  BG_NEGATIVE_WEAK: red[40],
  BG_NEGATIVE_NORMAL: red[50],
  BG_NEGATIVE_STRONG: red[60],

  // POSITIVE
  BG_POSITIVE_WEAKEST: green[5],
  BG_POSITIVE_WEAKER: green[10],
  BG_POSITIVE_WEAK: green[20],
  BG_POSITIVE_NORMAL: green[50],
  BG_POSITIVE_STRONG: green[60],

  // WARNING
  BG_WARNING_WEAKEST: yellow[5],
  BG_WARNING_WEAKER: yellow[10],
  BG_WARNING_WEAK: yellow[40],
  BG_WARNING_NORMAL: yellow[50],
  BG_WARNING_STRONG: yellow[60],

  // NEUTRAL
  BG_SURFACE: grey[0],
  BG_NEUTRAL_WEAKEST: grey[5],
  BG_NEUTRAL_WEAKER: grey[10],
  BG_NEUTRAL_WEAK: grey[20],
  BG_NEUTRAL_NORMAL: grey[30],
  BG_NEUTRAL_STRONG: grey[90],
  BG_INVERTED: grey[100],

  /************ TEXT ************/
  // BRAND
  TEXT_BRAND_WEAKEST: orange[20],
  TEXT_BRAND_WEAK: orange[40],
  TEXT_BRAND_NORMAL: orange[50],
  TEXT_BRAND_STRONG: orange[60],

  // ACCENT
  TEXT_ACCENT_WEAKEST: blue[20],
  TEXT_ACCENT_WEAK: blue[40],
  TEXT_ACCENT_NORMAL: blue[50],
  TEXT_ACCENT_STRONG: blue[60],

  // NEGATIVE
  TEXT_NEGATIVE_WEAKEST: red[20],
  TEXT_NEGATIVE_WEAK: red[40],
  TEXT_NEGATIVE_NORMAL: red[50],
  TEXT_NEGATIVE_STRONG: red[60],

  // POSITIVE
  TEXT_POSITIVE_WEAKEST: green[20],
  TEXT_POSITIVE_WEAK: green[40],
  TEXT_POSITIVE_NORMAL: green[50],
  TEXT_POSITIVE_STRONG: green[60],

  // WARNING
  TEXT_WARNING_WEAKEST: yellow[20],
  TEXT_WARNING_WEAK: yellow[40],
  TEXT_WARNING_NORMAL: yellow[50],
  TEXT_WARNING_STRONG: yellow[60],

  // NEUTRAL
  TEXT_INVERTED: grey[0],
  TEXT_NEUTRAL_WEAKEST: grey[30],
  TEXT_NEUTRAL_WEAKER: grey[40],
  TEXT_NEUTRAL_WEAK: grey[50],
  TEXT_NEUTRAL_NORMAL: grey[70],
  TEXT_NEUTRAL_STRONG: grey[90],

  /************ BORDER ************/
  // BRAND
  BORDER_BRAND_WEAKEST: orange[10],
  BORDER_BRAND_WEAK: orange[30],
  BORDER_BRAND_NORMAL: orange[50],
  BORDER_BRAND_STRONG: orange[60],

  // ACCENT
  BORDER_ACCENT_WEAKEST: blue[10],
  BORDER_ACCENT_WEAK: blue[30],
  BORDER_ACCENT_NORMAL: blue[50],
  BORDER_ACCENT_STRONG: blue[60],

  // NEGATIVE
  BORDER_NEGATIVE_WEAKEST: red[10],
  BORDER_NEGATIVE_WEAK: red[30],
  BORDER_NEGATIVE_NORMAL: red[50],
  BORDER_NEGATIVE_STRONG: red[60],

  // POSITIVE
  BORDER_POSITIVE_WEAKEST: green[10],
  BORDER_POSITIVE_WEAK: green[30],
  BORDER_POSITIVE_NORMAL: green[50],
  BORDER_POSITIVE_STRONG: green[60],

  // WARNING
  BORDER_WARNING_WEAKEST: yellow[10],
  BORDER_WARNING_WEAK: yellow[30],
  BORDER_WARNING_NORMAL: yellow[50],
  BORDER_WARNING_STRONG: yellow[60],

  // NEUTRAL
  BORDER_INVERTED: grey[0],
  BORDER_NEUTRAL_WEAKEST: grey[10],
  BORDER_NEUTRAL_WEAK: grey[20],
  BORDER_NEUTRAL_NORMAL: grey[50],
  BORDER_NEUTRAL_STRONG: grey[60],

  /************ ICON ************/
  // BRAND
  ICON_BRAND_WEAKEST: orange[20],
  ICON_BRAND_WEAK: orange[40],
  ICON_BRAND_NORMAL: orange[50],
  ICON_BRAND_STRONG: orange[60],

  // ACCENT
  ICON_ACCENT_WEAKEST: blue[20],
  ICON_ACCENT_WEAK: blue[40],
  ICON_ACCENT_NORMAL: blue[50],
  ICON_ACCENT_STRONG: blue[60],

  // NEGATIVE
  ICON_NEGATIVE_WEAKEST: red[20],
  ICON_NEGATIVE_WEAK: red[40],
  ICON_NEGATIVE_NORMAL: red[50],
  ICON_NEGATIVE_STRONG: red[60],

  // POSITIVE
  ICON_POSITIVE_WEAKEST: green[20],
  ICON_POSITIVE_WEAK: green[40],
  ICON_POSITIVE_NORMAL: green[50],
  ICON_POSITIVE_STRONG: green[60],

  // WARNING
  ICON_WARNING_WEAKEST: yellow[20],
  ICON_WARNING_WEAK: yellow[40],
  ICON_WARNING_NORMAL: yellow[50],
  ICON_WARNING_STRONG: yellow[60],

  // NEUTRAL
  ICON_INVERTED: grey[0],
  ICON_NEUTRAL_WEAKEST: grey[30],
  ICON_NEUTRAL_WEAKER: grey[40],
  ICON_NEUTRAL_WEAK: grey[50],
  ICON_NEUTRAL_NORMAL: grey[70],
  ICON_NEUTRAL_STRONG: grey[90],
};

export default colors;
